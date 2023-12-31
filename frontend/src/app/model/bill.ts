import { Car } from "./car";
import { Customer } from "./customer";

export interface Bill {
    id: string;
    customer: Customer;
    billedCars: BilledCar[];
    pricePerMonth: string;
}

export interface BillDTO {
    customer: Customer;
    billedCars: BilledCar[];
    pricePerMonth: string;
}

export interface BilledCar {
    car: Car;
    endDate: Date;
}

export interface BillPDFDTO {
    file: File;
    customer: Customer;
}

export interface BillPDF {
    id: string;
    name: string;
    creationDate: Date;
    data: Blob;
    customer: Customer,
}

export interface BillPDFNoData {
    id: string;
    name: string;
    creationDate: Date;
    customerFirstName: string;
    customerLastName: string,
}