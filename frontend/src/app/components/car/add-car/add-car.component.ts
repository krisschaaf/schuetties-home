import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarDTO, Photo } from 'src/app/model/car';
import { Customer } from 'src/app/model/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Utils } from '../../utils/utils';
import { PhotoUtils } from '../../utils/photoUtils';

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
      customerFormControl: new FormControl('', [Validators.required]),
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
        this.customers = customers.sort(Utils.dynamicSort('lastname'));
      }
    })
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

  getErrorMessageCustomerFormControl(): string {
    return this.customerFormControl.hasError('required')
      ? 'Es muss ein Kunde ausgewählt sein.'
      : '';
  }

  onFileChangedHandler(event: any) {
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
    return PhotoUtils.getPhotoSrc(this.photo!);
  }

  buildCar(): CarDTO {
    return {
      customer: this.customerFormControl.value,
      make: this.makeFormControl.value,
      model: this.modelFormControl.value,
      year: this.yearFormControl.value,
      license: this.licenseFormControl.value,
      date: this.dateFormControl.value,
      photo: this.photo ? this.photo : null,
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
}
