package controllers

import (
	"context"
	"net/http"
	"schuett-webapp-api/configs"
	"schuett-webapp-api/models"
	"schuett-webapp-api/responses"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var customerCollection *mongo.Collection = configs.GetCollection(configs.DB, "customers")

func CreateCustomer(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var customer models.Customer
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&customer); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.CustomerResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&customer); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.CustomerResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newCustomer := models.Customer{
		Id:                    primitive.NewObjectID(),
		Salutation:            customer.Salutation,
		Surname:               customer.Surname,
		Lastname:              customer.Lastname,
		Email:                 customer.Email,
		TelephonePrivate:      customer.TelephonePrivate,
		TelephoneBusiness:     customer.TelephoneBusiness,
		Mobile:                customer.Mobile,
		Fax:                   customer.Fax,
		Street:                customer.Street,
		HousingNumber:         customer.HousingNumber,
		PostalCode:            customer.PostalCode,
		City:                  customer.City,
		BankNumber:            customer.BankNumber,
		AdditionalInformation: customer.AdditionalInformation,
	}

	result, err := customerCollection.InsertOne(ctx, newCustomer)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.CustomerResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetACustomer(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	customerId := c.Params("customerId")
	var customer models.Customer
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(customerId)

	err := customerCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&customer)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.CustomerResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": customer}})
}

func EditACustomer(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	customerId := c.Params("customerId")
	var customer models.Customer
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(customerId)

	//validate the request body
	if err := c.BodyParser(&customer); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.CustomerResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&customer); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.CustomerResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	update := bson.M{
		"salutation":            customer.Salutation,
		"surname":               customer.Surname,
		"lastname":              customer.Lastname,
		"email":                 customer.Email,
		"telephonePrivate":      customer.TelephonePrivate,
		"telephoneBusiness":     customer.TelephoneBusiness,
		"mobile":                customer.Mobile,
		"fax":                   customer.Fax,
		"street":                customer.Street,
		"housingNumber":         customer.HousingNumber,
		"postalCode":            customer.PostalCode,
		"city":                  customer.City,
		"bankNumber":            customer.BankNumber,
		"additionalInformation": customer.AdditionalInformation,
	}

	result, err := customerCollection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$set": update})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//get updated customer details
	var updatedCustomer models.Customer
	if result.MatchedCount == 1 {
		err := customerCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedCustomer)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
	}

	return c.Status(http.StatusOK).JSON(responses.CustomerResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedCustomer}})
}

func DeleteACustomer(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	customerId := c.Params("customerId")
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(customerId)

	result, err := customerCollection.DeleteOne(ctx, bson.M{"id": objId})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if result.DeletedCount < 1 {
		return c.Status(http.StatusNotFound).JSON(
			responses.CustomerResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "Customer with specified ID not found!"}},
		)
	}

	return c.Status(http.StatusOK).JSON(
		responses.CustomerResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Customer successfully deleted!"}},
	)
}

func DeleteAllCustomers(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	results, err := customerCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleCustomer models.Customer

		if err = results.Decode(&singleCustomer); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		_, err := customerCollection.DeleteOne(ctx, bson.M{"id": singleCustomer.Id})
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

	}

	return c.Status(http.StatusOK).JSON(
		responses.CustomerResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Customers successfully deleted!"}},
	)
}

func GetAllCustomers(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var customers []models.Customer
	defer cancel()

	results, err := customerCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleCustomer models.Customer
		if err = results.Decode(&singleCustomer); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.CustomerResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		customers = append(customers, singleCustomer)
	}

	return c.Status(http.StatusOK).JSON(
		responses.CustomerResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": customers}},
	)
}
