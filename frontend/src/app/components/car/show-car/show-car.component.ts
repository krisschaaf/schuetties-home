import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car, Photo } from 'src/app/model/car';
import { Customer } from 'src/app/model/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls: ['./show-car.component.scss']
})
export class ShowCarComponent implements OnInit{
  showCarForm!: FormGroup;
  car!: Car;
  file!: File
  photo!: Photo | null;
  customers!: Customer[]

  constructor(private route: ActivatedRoute, private carService: CarService, private customerService: CustomerService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.queryParamMap.get('id');

    this.showCarForm = new FormGroup({
      customerFormControl: new FormControl(''),
      makeFormControl: new FormControl(''),
      modelFormControl: new FormControl(''),
      yearFormControl: new FormControl(''),
      licenseFormControl: new FormControl(''),
      dateFormControl: new FormControl(''),
    });
    // this.carService.getCarById(carId!).subscribe({
    //   next: (value) => {
    //   },
    //   error: () => {
    //       this.notificationService.notifyError();
    //   },
    // })

    this.customerService.getCustomers().subscribe({
      error: () => {
        this.notificationService.notifyError();
      },
      next: (customers) => {
        this.customers = customers.sort(this.dynamicSort('lastname'));
      }
    })
  }

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  dynamicSort(property: string) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substring(1);
    }
    return (a: any, b: any) => {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  get customerFormControl() {
    return this.showCarForm.get('customerFormControl') as FormControl;
  }

  get makeFormControl() {
    return this.showCarForm.get('makeFormControl') as FormControl;
  }

  get modelFormControl() {
    return this.showCarForm.get('modelFormControl') as FormControl;
  }

  get yearFormControl() {
    return this.showCarForm.get('yearFormControl') as FormControl;
  }

  get licenseFormControl() {
    return this.showCarForm.get('licenseFormControl') as FormControl;
  }

  get dateFormControl() {
    return this.showCarForm.get('dateFormControl') as FormControl;
  }

  onEditCarFormHandler() {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    if (this.file) {
      this.carService.uploadImage(this.file).subscribe({
        error: () => {
          this.notificationService.notifyError();
          this.photo = null;
        },
        next: (photo: Photo) => {
          this.photo = photo;
        }
      })
    }
  }

  getPhotoSrc(): string {
    if(!this.photo) {
      throw Error('Currently no photo uploaded!')
    } else {
      return `data:${this.photo!.type};base64,${this.photo!.data}`;
    }
  }
}
