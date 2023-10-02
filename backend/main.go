package main

import (
	"schuett-webapp-api/configs"
	"schuett-webapp-api/middleware"
	"schuett-webapp-api/routes"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowOrigins:     "http://localhost:4200",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	app.Use(adaptor.HTTPMiddleware(middleware.EnsureValidToken()))

	//run database
	configs.ConnectDB()

	//routes
	routes.UserRoute(app)
	routes.CustomerRoute(app)

	app.Listen(":8080")
}
