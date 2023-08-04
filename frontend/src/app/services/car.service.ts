import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { CarDTO } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = environment.backendBasePath + "car/";
  private addCarUrl = this.baseUrl + "addCar";
  private uploadImageUrl = this.baseUrl + "uploadImage";
  private getImageUrl = this.baseUrl + "getImage";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  addCar(car: CarDTO): Observable<any> {
    return this.http.post<any>(this.addCarUrl, car);
  }

  uploadImage(file: File): Observable<any> {
    return this.http.post<any>(this.uploadImageUrl, file);
  }

  getImage(): SafeUrl {
    return this.http.get<string>(this.getImageUrl).pipe(
      map(data => 
        this.sanitizer.bypassSecurityTrustUrl(data)
      )
    );
  }
}
