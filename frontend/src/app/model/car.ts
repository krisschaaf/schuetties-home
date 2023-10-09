export interface Car {
    id: string;
    customerId: string;
    make: string;
    model: string;
    year: string;
    license: string;
    date: Date;
    pictureId: string;
}

export interface CarDTO {
    customerId: string;
    make: string;
    model: string;
    year: string;
    license: string;
    date: Date;
    pictureId: string;
}

export interface Photo {
    id: string;
    name: string;
    type: string;
    data: any;
}