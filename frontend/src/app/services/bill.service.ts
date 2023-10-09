import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillDTO } from '../model/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = environment.backendBasePath + 'bills/'; 
  private billUrl = this.baseUrl + 'bill'; 

  constructor(private http: HttpClient) { }

  createBill(bill: BillDTO): Observable<any> {
    return this.http.post<any>(this.billUrl, bill);
  }
}
