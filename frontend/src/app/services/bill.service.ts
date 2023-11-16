import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillDTO, BillPDF } from '../model/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = environment.backendBasePath + 'bills/'; 
  private billUrl = this.baseUrl + 'bill'; 
  private billPhotoUrl = this.baseUrl + 'pdf'; 

  constructor(private http: HttpClient) { }

  createBill(bill: BillDTO): Observable<any> {
    return this.http.post<any>(this.billUrl, bill);
  }

  createAndGetPreviewBill(bill: BillDTO): Observable<any> {
    return this.http.post<any>(this.billUrl + '/getPreview', bill, {responseType: 'arrayBuffer' as 'json'});
  }

  createBillPDF(file: Blob): Observable<BillPDF> {
    const data: FormData = new FormData();
    data.append('pdfFile', file);
    return this.http.post<BillPDF>(this.billPhotoUrl, data);
  }
}
