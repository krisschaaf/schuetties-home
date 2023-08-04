export interface Car {
    id: string;
    customerId: string;
    make: string;
    model: string;
    year: string;
    license: string;
    date: Date;
    picture: File;
}

export interface CarDTO {
    customerId: string;
    make: string;
    model: string;
    year: string;
    license: string;
    date: Date;
    picture: File;
}