package auth

import (
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// RequireAuth acts as the first line of defense; parsing the Authorization header,
// cryptographic signature evaluation, and extracting the user context map.
func RequireAuth() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing or malformed Authorization Bearer token"})
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			secret = "replace-this-dangerous-development-secret-in-production"
		}

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			// Ensure cryptographic algorithm wasn't tampered with
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fiber.NewError(fiber.StatusUnauthorized, "Unexpected signature signing method")
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired JWT token"})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Corrupted or unreadable token claims structure"})
		}

		// Hydrate session locals natively inside the Fiber Context
		c.Locals("user_id", claims["user_id"])
		c.Locals("role", claims["role"])

		return c.Next()
	}
}

// RequireRole is the strict RBAC assertion middleware.
// It verifies that the pre-hydrated user context role safely maps against the approved subset.
// WARNING: This heavily relies on RequireAuth() being sequentially ahead in the routing pipe.
func RequireRole(allowedRoles ...Role) fiber.Handler {
	return func(c *fiber.Ctx) error {
		roleRaw := c.Locals("role")
		if roleRaw == nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized: role context completely missing. Context failure."})
		}

		userRole, ok := roleRaw.(string)
		if !ok {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Internal Error: Expected role strictly as string, failed to cast."})
		}

		for _, allowed := range allowedRoles {
			if string(allowed) == userRole {
				return c.Next()
			}
		}

		// Explicit 403 Forbidden - Authenticated, but not authorized for this slice of the platform.
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": "Forbidden: You possess insufficient privilege layers to orchestrate this resource.",
		})
	}
}
