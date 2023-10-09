import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
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
  todayDate = new Date();

  constructor(private customerService: CustomerService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.createBillForm = new FormGroup({
      customerFormControl: new FormControl(''),
      paymentAmountFormControl: new FormControl(''),
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
      return this.createBillForm.get('customerFormControl') as FormControl;
    }

    get paymentAmountFormControl() {
      return this.createBillForm.get('paymentAmountFormControl') as FormControl;
    }

    get dateFormControl() {
      return this.createBillForm.get('dateFormControl') as FormControl;
    }

  onCreateBillFormHandler() {

  }

}
