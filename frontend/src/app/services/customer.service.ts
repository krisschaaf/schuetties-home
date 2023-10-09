import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, CustomerDTO } from '../model/customer';
import { CustomerResponse } from '../model/CustomerResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.backendBasePath + 'customers/'; 
  private customerUrl = this.baseUrl + 'customer'; 

  constructor(private http: HttpClient) { }

  addCustomer(customer: CustomerDTO): Observable<any> {
    return this.http.post<any>(this.customerUrl, customer);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerUrl}/${id}`);
  }

  editCustomerById(customer: Customer): Observable<any> {
    return this.http.put<CustomerResponse>(this.customerUrl, customer); //TODO fix return values
  }

  deleteCustomerById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.customerUrl}/${id}`);
  }
}
