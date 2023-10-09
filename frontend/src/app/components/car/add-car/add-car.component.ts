import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarDTO, Photo } from 'src/app/model/car';
import { Customer } from 'src/app/model/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  addCarForm!: FormGroup;
  file!: File
  photo!: Photo | null;
  customers!: Customer[]

  constructor(private carService: CarService, private notificationService: NotificationService, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.photo = null;

    this.addCarForm = new FormGroup({
      customerFormControl: new FormControl(''),
      makeFormControl: new FormControl(''),
      modelFormControl: new FormControl(''),
      yearFormControl: new FormControl(''),
      licenseFormControl: new FormControl(''),
      dateFormControl: new FormControl(''),
    });

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
    return this.addCarForm.get('customerFormControl') as FormControl;
  }

  get makeFormControl() {
    return this.addCarForm.get('makeFormControl') as FormControl;
  }

  get modelFormControl() {
    return this.addCarForm.get('modelFormControl') as FormControl;
  }

  get yearFormControl() {
    return this.addCarForm.get('yearFormControl') as FormControl;
  }

  get licenseFormControl() {
    return this.addCarForm.get('licenseFormControl') as FormControl;
  }

  get dateFormControl() {
    return this.addCarForm.get('dateFormControl') as FormControl;
  }

  buildCar(): CarDTO {
    return {
      customerId: this.customerFormControl.value,
      make: this.makeFormControl.value,
      model: this.modelFormControl.value,
      year: this.yearFormControl.value,
      license: this.licenseFormControl.value,
      date: this.dateFormControl.value,
      pictureId: this.photo ? this.photo.id : "",
    }
  }

  onAddCarFormHandler(): void {
    this.carService.addCar(this.buildCar()).subscribe({
      error: () => {
        this.notificationService.notifyError();
    },
    next: () => {
      this.notificationService.notify('Das Auto wurde erfolgreich hinzugefügt!');
      this.router.navigateByUrl('/');
    },
    })
  }

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
          this.notificationService.notify(`Die Datei wurde erfolgreich hochgeladen.`);
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
