import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillService } from 'src/app/services/bill.service';
import { NotificationService } from 'src/app/services/notification.service';

export interface BillDialogData {
  billId: '';
}

@Component({
  selector: 'app-delete-bill-dialog',
  templateUrl: './delete-bill-dialog.component.html',
  styleUrls: ['./delete-bill-dialog.component.scss']
})
export class DeleteBillDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BillDialogData,
    private billService: BillService,
    private notificationService: NotificationService
  ) {}

  onDeleteBill(): void {
    this.billService.deleteBillPDFById(this.data.billId).subscribe({
      next: () => {
        this.billService.subject.next(1);
      },
      error: () => {
        this.notificationService.notifyError();
      }
    });
  }
}
