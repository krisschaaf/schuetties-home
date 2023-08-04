import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';

export interface DialogData {
  customerId: '';
}

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrls: ['./delete-customer-dialog.component.scss']
})
export class DeleteCustomerDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private customerService: CustomerService, 
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onDeleteCustomer(): void {
    this.customerService.deleteCustomerById(this.data.customerId).subscribe({
        next: () => {
          this.notificationService.notify('Der Kunde wurde erfolgreich gelöscht.');
          this.router.navigateByUrl('/customers');
        },
        error: () => {
          this.notificationService.notifyError();
        }
      })
  }
}
