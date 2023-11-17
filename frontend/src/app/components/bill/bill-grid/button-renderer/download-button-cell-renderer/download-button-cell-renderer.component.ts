import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { BillService } from "src/app/services/bill.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
    selector: 'download-button-cell-renderer',
    templateUrl: './download-button-cell-renderer.component.html',
    styleUrls: ['./download-button-cell-renderer.component.scss']
})
export class DownloadButtonCellRenderer implements ICellRendererAngularComp {
    private cellValues!: any

    constructor(
        private billService: BillService,
        private notificationService: NotificationService,
    ) {}

    agInit(params: ICellRendererParams): void {
        this.cellValues = params.data;
    }

    refresh(params: ICellRendererParams): boolean {
        this.cellValues = params.data;
        return true;
    }

    btnClickedHandler() {
        this.billService.getPdfDataById(this.cellValues.id).subscribe({
            next: (bytes) => {
              const blob = new Blob([bytes], { type: 'application/pdf' });
              
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
      
              link.setAttribute('target', '_blank');
              link.setAttribute('href', url);
              link.setAttribute('download', `${this.cellValues.name}.pdf`);
      
              document.body.appendChild(link);
      
              link.click();
              link.remove();

            },
            error: () => {
              this.notificationService.notifyError();
            }
          })        
    }
}