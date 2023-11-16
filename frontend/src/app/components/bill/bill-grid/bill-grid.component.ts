import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { BillPDF } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DownloadButtonCellRenderer } from './button-renderer/download-button-cell-renderer/download-button-cell-renderer.component';
import { PreviewButtonCellRendererComponent } from './button-renderer/preview-button-cell-renderer/preview-button-cell-renderer.component';

@Component({
  selector: 'app-bill-grid',
  templateUrl: './bill-grid.component.html',
  styleUrls: ['./bill-grid.component.scss']
})
export class BillGridComponent {

  constructor(
    private billService: BillService,
    private notificationService: NotificationService,
    ) {}

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular
  public rowData!: BillPDF[];

  colDefs: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'name', headerName: 'Preview', cellRenderer: PreviewButtonCellRendererComponent },
    { field: 'name', headerName: 'Download', cellRenderer: DownloadButtonCellRenderer },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  ngOnInit() {
    this.billService.getBillPDFs().subscribe({
      next: (value) => {
        this.rowData = value;
      },
      error: () => {
        this.notificationService.notify('Etwas ist schiefgelaufen. Bitte versuch es noch einmal.');
      }
    })
  }
}
