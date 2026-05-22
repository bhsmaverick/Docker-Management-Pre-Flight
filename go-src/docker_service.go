package system

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

// AppError represents a user-friendly structured error
type AppError struct {
	StatusCode int    `json:"status_code"`
	Message    string `json:"error"`
	Details    string `json:"details,omitempty"`
}

func (e *AppError) Error() string {
	return e.Message
}

// DockerService encapsulates the daemon communication interface
type DockerService struct {
	cli *client.Client
}

// handleDockerError translates low-level socket and daemon errors into user-friendly API responses
func handleDockerError(err error) error {
	if err == nil {
		return nil
	}
	
	// Check for permission issues with the socket
	if os.IsPermission(err) || strings.Contains(err.Error(), "permission denied") {
		return &AppError{
			StatusCode: 500,
			Message:    "Permission denied to /var/run/docker.sock. You must join the 'docker' group (e.g., 'sudo usermod -aG docker $USER') and restart your session.",
			Details:    err.Error(),
		}
	}
	
	// Check if socket is missing
	if os.IsNotExist(err) || strings.Contains(err.Error(), "no such file or directory") || strings.Contains(err.Error(), "connect: no such file or directory") {
		return &AppError{
			StatusCode: 500,
			Message:    "Docker socket file /var/run/docker.sock does not exist. Is Docker running?",
			Details:    err.Error(),
		}
	}

	return &AppError{
		StatusCode: 500,
		Message:    "A system error occurred while communicating with the Docker daemon",
		Details:    err.Error(),
	}
}

// NewDockerService provisions the SDK client using local environment descriptors
func NewDockerService() (*DockerService, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, handleDockerError(err)
	}
	return &DockerService{cli: cli}, nil
}

// checkDockerSocket verifies /var/run/docker.sock exists and is readable.
func checkDockerSocket() error {
	socketPath := "/var/run/docker.sock"
	f, err := os.OpenFile(socketPath, os.O_RDWR, 0)
	if err != nil {
		return &AppError{
			StatusCode: 500,
			Message:    "Docker daemon connection failed. Please ensure the service is running and permissions are set.",
			Details:    err.Error(),
		}
	}
	f.Close()
	return nil
}

// executeWithSocketCheck wraps Docker client interactions
func (s *DockerService) executeWithSocketCheck(op func() error) error {
	if err := checkDockerSocket(); err != nil {
		return err
	}
	return handleDockerError(op())
}

// ListContainers retrieves an array of containers regardless of their execution state
func (s *DockerService) ListContainers(ctx context.Context) ([]container.Summary, error) {
	if err := checkDockerSocket(); err != nil {
		return nil, err
	}
	containers, err := s.cli.ContainerList(ctx, container.ListOptions{All: true})
	return containers, handleDockerError(err)
}

// ContainerLogs streams the tail output from the specified container daemon
func (s *DockerService) ContainerLogs(ctx context.Context, containerID string) (string, error) {
	if err := checkDockerSocket(); err != nil {
		return "", err
	}
	reader, err := s.cli.ContainerLogs(ctx, containerID, container.LogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Tail:       "100",
	})
	if err != nil {
		return "", handleDockerError(err)
	}
	defer reader.Close()

	out, err := io.ReadAll(reader)
	if err != nil {
		return "", handleDockerError(err)
	}
	
	// Note: API returns multiplexed streams with an 8-byte header per frame for TTY=false.
	// For production UI parsing, you would typically demultiplex this using stdcopy.StdCopy.
	return string(out), nil
}

// RestartContainer forces a teardown and reconstruction of the targeted instance
func (s *DockerService) RestartContainer(ctx context.Context, containerID string) error {
	if err := checkDockerSocket(); err != nil {
		return err
	}
	timeout := 10 // Proceed with forceful termination if SIGTERM is ignored after 10 seconds
	return handleDockerError(s.cli.ContainerRestart(ctx, containerID, container.StopOptions{Timeout: &timeout}))
}

// Ping explicitly checks connectivity to the Docker Daemon for health checks
func (s *DockerService) Ping(ctx context.Context) error {
	if err := checkDockerSocket(); err != nil {
		return err
	}
	_, err := s.cli.Ping(ctx)
	return handleDockerError(err)
}
