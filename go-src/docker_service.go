package system

import (
	"context"
	"io"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

// DockerService encapsulates the daemon communication interface
type DockerService struct {
	cli *client.Client
}

// NewDockerService provisions the SDK client using local environment descriptors
func NewDockerService() (*DockerService, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}
	return &DockerService{cli: cli}, nil
}

// ListContainers retrieves an array of containers regardless of their execution state
func (s *DockerService) ListContainers(ctx context.Context) ([]container.Summary, error) {
	return s.cli.ContainerList(ctx, container.ListOptions{All: true})
}

// ContainerLogs streams the tail output from the specified container daemon
func (s *DockerService) ContainerLogs(ctx context.Context, containerID string) (string, error) {
	reader, err := s.cli.ContainerLogs(ctx, containerID, container.LogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Tail:       "100",
	})
	if err != nil {
		return "", err
	}
	defer reader.Close()

	out, err := io.ReadAll(reader)
	if err != nil {
		return "", err
	}
	
	// Note: API returns multiplexed streams with an 8-byte header per frame for TTY=false.
	// For production UI parsing, you would typically demultiplex this using stdcopy.StdCopy.
	return string(out), nil
}

// RestartContainer forces a teardown and reconstruction of the targeted instance
func (s *DockerService) RestartContainer(ctx context.Context, containerID string) error {
	timeout := 10 // Proceed with forceful termination if SIGTERM is ignored after 10 seconds
	return s.cli.ContainerRestart(ctx, containerID, container.StopOptions{Timeout: &timeout})
}
