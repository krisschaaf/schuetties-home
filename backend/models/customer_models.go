package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Customer struct {
	Id                    primitive.ObjectID `json:"id,omitempty"`
	Salutation            string             `json:"salutation,omitempty"`
	Surname               string             `json:"surname,omitempty"`
	Lastname              string             `json:"lastname,omitempty"`
	Email                 string             `json:"email,omitempty"`
	TelephonePrivate      string             `json:"telephonePrivate,omitempty"`
	TelephoneBusiness     string             `json:"telephoneBusiness,omitempty"`
	Mobile                string             `json:"mobile,omitempty"`
	Fax                   string             `json:"fax,omitempty"`
	Street                string             `json:"street,omitempty"`
	HousingNumber         string             `json:"housingNumber,omitempty"`
	PostalCode            string             `json:"postalCode,omitempty"`
	City                  string             `json:"city,omitempty"`
	BankNumber            string             `json:"bankNumber,omitempty"`
	AdditionalInformation string             `json:"additionalInformation,omitempty"`
}
