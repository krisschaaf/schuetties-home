import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDTO, Photo } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = environment.backendBasePath + "cars/";
  private addCarUrl = this.baseUrl + "car";
  private uploadImageUrl = this.baseUrl + "photos";

  constructor(private http: HttpClient) { }

  addCar(car: CarDTO): Observable<any> {
    return this.http.post<any>(this.addCarUrl, car);
  }

  uploadImage(file: File): Observable<Photo> {
    const data: FormData = new FormData();
    data.append('photoFile', file);
    return this.http.post<Photo>(this.uploadImageUrl, data);
  }
}
