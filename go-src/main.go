package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"panel/auth"
	"panel/system"
)

func main() {
	// 1. Initialize persistent storage layer
	db, err := gorm.Open(sqlite.Open("docker_panel.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Critical system failure: Unable to mount SQLite matrix: %v", err)
	}

	// Migrate identity structures
	if err := db.AutoMigrate(&auth.User{}); err != nil {
		log.Fatalf("Database schema migration halted: %v", err)
	}

	// 2. Initialize application framework
	app := fiber.New()
	
	// Add strict CORS for the frontend origin
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))
	
	app.Use(logger.New())

	// 3. Mount Service Interfaces
	authHandler := &auth.AuthHandler{DB: db}
	
	dockerSvc, err := system.NewDockerService()
	if err != nil {
		log.Printf("Error: Cannot access Docker Socket - check permissions/group. Orchestration disabled. Details: %v", err)
	} else {
		// Attempt a simple ping to verify socket connectivity
		_, pingErr := dockerSvc.ListContainers(context.Background())
		if pingErr != nil {
			log.Printf("Error: Cannot access Docker Socket - check permissions/group. Initial SDK connect succeeded but ping failed: %v", pingErr)
		} else {
			log.Printf("Docker Socket connected")
		}
	}
	webhookHandler := &system.WebhookHandler{DockerService: dockerSvc}
	backupSvc := &system.BackupService{}

	// 4. Register Unauthenticated Routes
	api := app.Group("/api")
	api.Post("/register", authHandler.Register)
	api.Post("/login", authHandler.Login)
	
	// CI/CD Webhook (Protected by Pre-Shared Secret, not session JWT)
	api.Post("/webhooks/restart/:container_id", webhookHandler.RestartContainer)

	// 5. Register Authenticated & RBAC Protected Routes
	protected := api.Group("/system")
	// Enforce valid JWT presence
	protected.Use(auth.RequireAuth())

	// Super-Admin restricted operations
	adminGroup := protected.Group("/admin")
	adminGroup.Use(auth.RequireRole(auth.RoleAdmin))
	
	adminGroup.Post("/backup", backupSvc.TriggerBackup)
	
	// Delegate container listing and logs to the docker service
	protected.Get("/containers", func(c *fiber.Ctx) error {
		if dockerSvc == nil {
			return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{"error": "Docker service unavailable"})
		}
		
		containers, err := dockerSvc.ListContainers(c.Context())
		if err != nil {
			if appErr, ok := err.(*system.AppError); ok {
				return c.Status(appErr.StatusCode).JSON(appErr)
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		
		return c.JSON(fiber.Map{"containers": containers})
	})
	
	protected.Get("/containers/:container_id/logs", func(c *fiber.Ctx) error {
		if dockerSvc == nil {
			return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{"error": "Docker service unavailable"})
		}
		
		logs, err := dockerSvc.ContainerLogs(c.Context(), c.Params("container_id"))
		if err != nil {
			if appErr, ok := err.(*system.AppError); ok {
				return c.Status(appErr.StatusCode).JSON(appErr)
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		
		return c.JSON(fiber.Map{"logs": logs})
	})
	
	adminGroup.Post("/containers/:container_id/restart", func(c *fiber.Ctx) error {
		if dockerSvc == nil {
			return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{"error": "Docker service unavailable"})
		}
		
		err := dockerSvc.RestartContainer(c.Context(), c.Params("container_id"))
		if err != nil {
			if appErr, ok := err.(*system.AppError); ok {
				return c.Status(appErr.StatusCode).JSON(appErr)
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		
		return c.JSON(fiber.Map{"message": "Container restarted"})
	})

	// Launch network listener
	log.Println("Docker Management Panel online. Listening on :8080...")
	if err := app.Listen(":8080"); err != nil {
		log.Fatalf("Network listener collapsed: %v", err)
	}
}
