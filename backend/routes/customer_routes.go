package routes

import (
	"schuett-webapp-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func CustomerRoute(app *fiber.App) {
	app.Post("/customer/createCustomer", controllers.CreateCustomer)
	app.Get("/customer/:customerId", controllers.GetACustomer)
	app.Put("/customer/:customerId", controllers.EditACustomer)
	app.Delete("/customer/deleteAll", controllers.DeleteAllCustomers)
	app.Delete("/customer/:customerId", controllers.DeleteACustomer)
	app.Get("/customers", controllers.GetAllCustomers)
}
