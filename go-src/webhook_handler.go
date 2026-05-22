package system

import (
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// WebhookHandler wraps the docker service to provide CI/CD triggering mechanisms
type WebhookHandler struct {
	DockerService *DockerService
}

// RestartContainer exposes a secure POST route that external pipelines (e.g. GitHub Actions)
// can invoke without requiring a system user account login.
func (h *WebhookHandler) RestartContainer(c *fiber.Ctx) error {
	containerID := c.Params("container_id")
	if containerID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Structural failure: container_id parameter missing"})
	}

	authHeader := c.Get("Authorization")
	secret := os.Getenv("WEBHOOK_SECRET")
	if secret == "" {
		secret = "replace-this-dangerous-development-webhook-secret-in-production"
	}

	// Validate the shared secret using typical Bearer encapsulation
	if !strings.HasPrefix(authHeader, "Bearer ") || strings.TrimPrefix(authHeader, "Bearer ") != secret {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized webhook trigger attempt"})
	}

	// Hand off operational execution to the Docker interface
	if err := h.DockerService.RestartContainer(c.Context(), containerID); err != nil {
		if appErr, ok := err.(*AppError); ok {
			return c.Status(appErr.StatusCode).JSON(appErr)
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to orchestrate container restart",
			"details": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message":      "Container restarted dynamically",
		"container_id": containerID,
	})
}
