package auth

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// AuthHandler wraps dependencies necessary for authentication operations
type AuthHandler struct {
	DB *gorm.DB
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     Role   `json:"role"` // Optional, usually heavily restricted
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Register parses credentials, secures the password via bcrypt, and provisions the user
func (h *AuthHandler) Register(c *fiber.Ctx) error {
	var req RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body payload"})
	}

	if req.Email == "" || len(req.Password) < 8 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Email is required and password must be >= 8 characters"})
	}

	// Calculate secure one-way hash using default cost
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to encrypt credentials"})
	}

	// Strictly limit role assignments upon registration, default to viewer if undefined
	role := req.Role
	if role != RoleAdmin && role != RoleViewer {
		role = RoleViewer 
	}

	user := User{
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		Role:         role,
	}

	if err := h.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Email already exists or database constraint failed"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User registered successfully",
		"user":    user,
	})
}

// Login validates user credentials against the persistent store and issues an expiring JWT
func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body payload"})
	}

	var user User
	// Note: Avoiding detailed constraint errors to prevent username enumeration side-channels
	if err := h.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials provided"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials provided"})
	}

	// Payload construction for JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(), // Strict 24 hour session lifecycle
	})

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "replace-this-dangerous-development-secret-in-production"
	}

	signedToken, err := token.SignedString([]byte(secret))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to sign authentication token"})
	}

	return c.JSON(fiber.Map{
		"message": "Authentication successful",
		"token":   signedToken,
		"user":    user,
	})
}
