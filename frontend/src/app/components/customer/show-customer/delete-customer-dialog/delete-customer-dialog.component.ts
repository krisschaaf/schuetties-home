import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';

export interface CustomerDialogData {
  customerId: '';
}

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrls: ['./delete-customer-dialog.component.scss']
})
export class DeleteCustomerDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerDialogData, 
    private customerService: CustomerService, 
    private carService: CarService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onDeleteCustomer(): void {
    forkJoin({
      deleteCarsRequest: this.carService.deleteAllCarsByCustomerId(this.data.customerId),
      deleteCustomerRequest:  this.customerService.deleteCustomerById(this.data.customerId)
    }).subscribe({
        next: () => {
          this.notificationService.notify('Der Kunde und die zugehörigen Autos wurden erfolgreich gelöscht.');
          this.router.navigateByUrl('/customers');
        },
        error: () => {
          this.notificationService.notifyError();
        }
      })
  }
}
