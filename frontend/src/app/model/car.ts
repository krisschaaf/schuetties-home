import { Customer } from "./customer";

export interface Car {
    id: string;
    customer: Customer;
    make: string;
    model: string;
    year: string;
    license: string;
    date: Date;
    photo: Photo | null;
}

export interface CarDTO {
    customer: Customer;
    make: string;
    model: string;
    year: string;
    license: string;
    date: Date;
    photo: Photo | null;
}

export interface Photo {
    id: string;
    name: string;
    type: string;
    data: any;
}