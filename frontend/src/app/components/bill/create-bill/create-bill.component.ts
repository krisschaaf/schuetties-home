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
import { Utils } from '../../utils/utils';
import { PhotoUtils } from '../../utils/photoUtils';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {
  createBillForm!: FormGroup;
  customers!: Customer[];
  availableCars: Car[] = [];
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
      paymentAmountFormControl: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^\\d+[.]\\d{2}$'))]),
      carFormControl: new FormControl({value: '', disabled: true}),
    });

    this.customerService.getCustomers().subscribe({
      error: () => {
        this.notificationService.notifyError();
      },
      next: (customers) => {
        this.customers = customers.sort(Utils.dynamicSort('lastname'));
      }
    });
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

  getErrorMessageCustomerFormControl(): string {
    return this.customerFormControl.hasError('required')
      ? 'Es muss ein Kunde ausgewählt sein.'
      : '';
  }

  getErrorMessagePaymentAmountFormControl(): string {
    return this.paymentAmountFormControl.hasError('required')
      ? 'Dieses Feld muss ausgefüllt sein.'
      : this.paymentAmountFormControl.invalid
      ? 'Der Preis muss z.B. 12.00 sein.'
      : '';
  }

  onNewCustomerChoosenHandler(customer: Customer) {
    this.billedCars = [];
    this.loadAvailableCarsOfCustomer(customer.id);
  }

  onNewCarChoosenHandler(car: Car) {
    const billedCar: BilledCar = {
      car: car,
      endDate: this.todayDate,
    }
    this.billedCars.push(billedCar);
    this.deleteCarFromAvailableCars(car);
    this.carFormControl.setValue('', {onlySelf: true});
  }

  onEndDateChangedHandler(newEndDate: MatDatepickerInputEvent<any, any>, updatedBilledCar: BilledCar) {
    updatedBilledCar.endDate = newEndDate.value;

    let indexToUpdate = this.billedCars.findIndex(item => item.car.id === updatedBilledCar.car.id);
    this.billedCars[indexToUpdate] = updatedBilledCar;
  }

  onCarFromBillDeletedHandler(billedCar: BilledCar) {
    const index = this.billedCars.findIndex(item => item.car.id == billedCar.car.id);
    if (index > -1) {
      this.billedCars.splice(index, 1);
    }
    this.availableCars.push(billedCar.car);
  }

  loadAvailableCarsOfCustomer(customerId: string) {
    this.carService.getCarsByCustomerId(customerId).subscribe({
      error: () => {
        this.notificationService.notifyError();
      },
      next: (cars) => {
        this.availableCars = cars.sort(Utils.dynamicSort('make'));
        this.carFormControl.enable();
      }
    });
  }

  deleteCarFromAvailableCars(availableCar: Car) {
    const index = this.availableCars.findIndex(item => item.id == availableCar.id);
    if (index > -1) {
      this.availableCars.splice(index, 1);
    }
  }

  getPhotoSrc(photo: Photo): string {
    return PhotoUtils.getPhotoSrc(photo);
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
