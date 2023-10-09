import { Car } from "./car";
import { Customer } from "./customer";

export interface Bill {
    customer: Customer;
    billedCars: BilledCar[];
    paymentAmount: string;
}

export interface BilledCar {
    car: Car;
    endDate: Date;
}