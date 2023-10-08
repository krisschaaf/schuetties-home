import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, CustomerDTO } from '../model/customer';
import { CustomerResponse, GetCustomersResponse } from '../model/CustomerResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.backendBasePath; 
  private addCustomerUrl = this.baseUrl + "customers"; 
  private getCustomersUrl = this.baseUrl + "customers"; 
  private getCustomerByIdUrl = this.baseUrl + "customers"; 
  private editCustomerByIdUrl = this.baseUrl + "customers"; 
  private deleteCustomerByIdUrl = this.baseUrl + "customers"; 

  constructor(private http: HttpClient) { }

  addCustomer(customer: CustomerDTO): Observable<any> {
    return this.http.post<any>(this.addCustomerUrl, customer);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.getCustomersUrl);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.getCustomerByIdUrl}/${id}`);
  }

  editCustomerById(customer: Customer): Observable<any> {
    return this.http.put<CustomerResponse>(this.editCustomerByIdUrl, customer);
  }

  deleteCustomerById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.deleteCustomerByIdUrl}/${id}`);
  }
}
