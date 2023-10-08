import { Customer } from "./customer";

export interface GetCustomersResponse {
    data: Customer[];
}

export interface CustomerResponse {
    status: string;
    message: string;
    data: {
        data: Customer;
    };
}