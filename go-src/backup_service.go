package system

import (
	"os/exec"

	"github.com/gofiber/fiber/v2"
)

// BackupService provides external script orchestration capabilities
type BackupService struct{}

// TriggerBackup invokes an OS-level shell script orchestrating database dumps into S3 object storage
func (s *BackupService) TriggerBackup(c *fiber.Ctx) error {
	// Execute the shell script isolated off the system PATH
	// Assumes /scripts/backup_to_s3.sh is pre-provisioned and marked executable (+x)
	cmd := exec.Command("/bin/sh", "-c", "/scripts/backup_to_s3.sh")
	
	output, err := cmd.CombinedOutput()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Backup workflow orchestration failed securely",
			"logs":  string(output),
		})
	}

	return c.JSON(fiber.Map{
		"message": "Data matrix securely serialized and synchronized to S3 storage bucket",
		"logs":    string(output),
	})
}
