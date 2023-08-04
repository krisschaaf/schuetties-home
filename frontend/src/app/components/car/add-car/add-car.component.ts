import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CarDTO } from 'src/app/model/car';
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
  file!: File;
  fileUploadedSubject = new BehaviorSubject<boolean>(false);
  fileUploaded!: boolean;
  customers!: Customer[]

  constructor(private carService: CarService, private notificationService: NotificationService, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.setFileUploadedState(false);

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
        this.customers = customers.data.data.sort(this.dynamicSort('lastname'));
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

  setFileUploadedState(state: boolean) {
    this.fileUploadedSubject.next(state)
    this.fileUploaded = state;
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
    const customer = this.customerFormControl.value; //TODO: get id

    return {
      customerId: customer,
      make: this.makeFormControl.value,
      model: this.modelFormControl.value,
      year: this.yearFormControl.value,
      license: this.licenseFormControl.value,
      date: this.dateFormControl.value,
      picture: this.file,
    }
  }

  findSelectedCustomerInArray() {
    
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

  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    if (this.file) {
      this.carService.uploadImage(this.file).subscribe({
        error: () => {
          this.notificationService.notifyError();
          this.setFileUploadedState(false);
        },
        next: () => {
          this.notificationService.notify('Datei wurde hochgeladen.');
          this.setFileUploadedState(true);
        }
      })
    }
  }

  getImage(): SafeUrl {
    return this.carService.getImage();
  }
}
