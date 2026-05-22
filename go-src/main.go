package main

import (
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
		log.Printf("Warning: Failed to bind Docker daemon socket. Orchestration disabled. %v", err)
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
	// Additional docker operations can be placed here

	// Launch network listener
	log.Println("Docker Management Panel online. Listening on :8080...")
	if err := app.Listen(":8080"); err != nil {
		log.Fatalf("Network listener collapsed: %v", err)
	}
}
