import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bill } from 'src/app/model/bill';
import { Car, Photo } from 'src/app/model/car';
import { Customer } from 'src/app/model/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {
  createBillForm!: FormGroup;
  customers!: Customer[];
  cars!: Car[];
  carsOnBill: Car[] = [];
  todayDate = new Date();

  constructor(
    private customerService: CustomerService, 
    private carService: CarService, 
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    this.createBillForm = new FormGroup({
      customerFormControl: new FormControl(''),
      paymentAmountFormControl: new FormControl(''),
      carFormControl: new FormControl(''),
      dateFormControl: new FormControl(''),
    });

    this.customerService.getCustomers().subscribe({
      error: () => {
        this.notificationService.notifyError();
      },
      next: (customers) => {
        this.customers = customers.sort(this.dynamicSort('lastname'));
      }
    });

    this.carService.getCars().subscribe({
      error: () => {
        this.notificationService.notifyError();
      },
      next: (cars) => {
        this.cars = cars.sort(this.dynamicSort('make'));
      }
    });
  }

  getPhotoSrc(photo: Photo): string {
    return `data:${photo.type};base64,${photo.data}`;
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

  addCarToBill(car: Car) {
    this.carsOnBill.push(car);
    this.carFormControl.setValue('', {onlySelf: true});
  }

  deleteCarFromBill(car: Car) {
    const index = this.carsOnBill.findIndex(item => item.id == car.id);
    if (index > -1) {
      this.carsOnBill.splice(index, 1);
   }
  }

  get customerFormControl() {
    return this.createBillForm.get('customerFormControl') as FormControl;
  }

  get paymentAmountFormControl() {
    return this.createBillForm.get('paymentAmountFormControl') as FormControl;
  }

  get carFormControl() {
    return this.createBillForm.get('carFormControl') as FormControl;
  }

  get dateFormControl() {
    return this.createBillForm.get('dateFormControl') as FormControl;
  }

  onCreateBillFormHandler() {

  }
}
