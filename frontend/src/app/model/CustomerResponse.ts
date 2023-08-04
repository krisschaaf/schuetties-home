import { Customer } from "./customer";

export interface GetCustomersResponse {
    status: string;
    message: string;
    data: {
        data: Customer[];
    };
}

export interface CustomerResponse {
    status: string;
    message: string;
    data: {
        data: Customer;
    };
}