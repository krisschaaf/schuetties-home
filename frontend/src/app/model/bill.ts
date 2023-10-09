import { Car } from "./car";
import { Customer } from "./customer";

export interface Bill {
    id: string;
    customer: Customer;
    billedCars: BilledCar[];
    paymentAmount: string;
}

export interface BillDTO {
    customer: Customer;
    billedCars: BilledCar[];
    paymentAmount: string;
}

export interface BilledCar {
    car: Car;
    endDate: Date;
}