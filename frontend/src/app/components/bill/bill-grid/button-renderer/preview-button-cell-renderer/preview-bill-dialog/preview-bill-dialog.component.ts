import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BillService } from 'src/app/services/bill.service';
import { NotificationService } from 'src/app/services/notification.service';

interface BillDialogData {
  id: string
}

@Component({
  selector: 'app-preview-bill-dialog',
  templateUrl: './preview-bill-dialog.component.html',
  styleUrls: ['./preview-bill-dialog.component.scss']
})
export class PreviewBillDialogComponent {
  fileUrl!: SafeUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BillDialogData,
    private sanitizer: DomSanitizer,
    private billService: BillService,
    private notificationService: NotificationService,
  ) {
    this.billService.getPdfDataById(data.id).subscribe({
      next: (bytes) => {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      },
      error: () => {
        this.notificationService.notifyError();
      }
    })
  }
}
