import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BillDTO, BilledCar } from 'src/app/model/bill';
import { Car, Photo } from 'src/app/model/car';
import { Customer } from 'src/app/model/customer';
import { BillService } from 'src/app/services/bill.service';
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
  billedCars: BilledCar[] = [];
  todayDate = new Date();

  constructor(
    private customerService: CustomerService, 
    private carService: CarService, 
    private notificationService: NotificationService,
    private billService: BillService,
    ) { }

  ngOnInit(): void {
    this.createBillForm = new FormGroup({
      customerFormControl: new FormControl('', [Validators.required]),
      paymentAmountFormControl: new FormControl('', [Validators.required]),
      carFormControl: new FormControl(''),
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
    const billedCar: BilledCar = {
      car: car,
      endDate: this.todayDate,
    }
    this.billedCars.push(billedCar);
    this.carFormControl.setValue('', {onlySelf: true});
  }

  changeEndDate(newEndDate: MatDatepickerInputEvent<any, any>, updatedBilledCar: BilledCar) {
    updatedBilledCar.endDate = newEndDate.value;

    let indexToUpdate = this.billedCars.findIndex(item => item.car.id === updatedBilledCar.car.id);
    this.billedCars[indexToUpdate] = updatedBilledCar;
  }

  deleteCarFromBill(billedCar: BilledCar) {
    const index = this.billedCars.findIndex(item => item.car.id == billedCar.car.id);
    if (index > -1) {
      this.billedCars.splice(index, 1);
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

  buildBill(): BillDTO {
    return {
      customer: this.customerFormControl.value,
      billedCars: this.billedCars,
      paymentAmount: this.paymentAmountFormControl.value
    }
  }

  onCreateBillFormHandler() {
    if(this.billedCars.length > 0) {
      this.billService.createBill(this.buildBill()).subscribe({
        error: () => {
          this.notificationService.notifyError();
        },
        next: () => {
          this.notificationService.notify('Überprüfe die Eingaben.')
        },
      });
    } else {
      this.notificationService.notify('Es muss mindestens ein Auto angegeben werden.')
    }
  }
}
