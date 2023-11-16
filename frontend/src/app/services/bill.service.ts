import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillDTO, BillPDF, BillPDFDTO } from '../model/bill';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = environment.backendBasePath + 'bills/'; 
  private billUrl = this.baseUrl + 'bill'; 
  private billPDFUrl = this.baseUrl + 'pdf'; 

  public subject = new Subject();

  constructor(private http: HttpClient) { }

  createBill(bill: BillDTO): Observable<any> {
    return this.http.post<any>(this.billUrl, bill);
  }

  createAndGetPreviewBill(bill: BillDTO): Observable<any> {
    return this.http.post<any>(this.billUrl + '/getPreview', bill, {responseType: 'arrayBuffer' as 'json'});
  }

  createBillPDF(billPDFDTO: BillPDFDTO): Observable<BillPDF> {
    const data: FormData = new FormData();
    data.append('pdfFile', billPDFDTO.file, billPDFDTO.file.name);
    data.append('customerId', billPDFDTO.customer.id)

    return this.http.post<BillPDF>(this.billPDFUrl, data);
  }

  getBillPDFs(): Observable<BillPDF[]> {
    return this.http.get<BillPDF[]>(this.billPDFUrl);
  }

  deleteBillPDFById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.billPDFUrl}/${id}`);
  }
}
