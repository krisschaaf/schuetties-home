import { Customer } from "./customer";

export interface GetCustomersResponse { //TODO check if needed
    data: Customer[];
}

export interface CustomerResponse { //TODO check if needed
    status: string;
    message: string;
    data: {
        data: Customer;
    };
}