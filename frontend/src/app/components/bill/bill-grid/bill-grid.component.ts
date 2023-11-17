import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BillPDF, BillPDFNoData } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DownloadButtonCellRenderer } from './button-renderer/download-button-cell-renderer/download-button-cell-renderer.component';
import { PreviewButtonCellRendererComponent } from './button-renderer/preview-button-cell-renderer/preview-button-cell-renderer.component';
import { DeleteButtonCellRendererComponent } from './button-renderer/delete-button-cell-renderer/delete-button-cell-renderer.component';
import { GridDateCellRendererComponent } from '../../utils/grid-date-cell-renderer/grid-date-cell-renderer.component';

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
  public rowData!: BillPDFNoData[];

  colDefs: ColDef[] = [
    { field: 'name', headerName: 'Dateiname' },
    { field: 'customerFirstName', headerName: 'Vorname', width: 140 },
    { field: 'customerLastName', headerName: 'Nachname', width: 140 },
    { field: 'creationDate', headerName: 'Erstellt am', cellRenderer: GridDateCellRendererComponent, width: 130 },
    { field: 'id', headerName: 'Vorschau', cellRenderer: PreviewButtonCellRendererComponent, width: 140 },
    { headerName: 'Herunteladen', cellRenderer: DownloadButtonCellRenderer, width: 175 },
    { field: 'id', headerName: 'Löschen', cellRenderer: DeleteButtonCellRendererComponent, width: 135 },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  ngOnInit() {
    this.billService.subject.subscribe(x => {
      this.billService.getBillPDFsNoData().subscribe({
        next: (value) => {
          this.rowData = value;
        },
        error: () => {
          this.notificationService.notifyError();
        }
      })
    })

    this.billService.getBillPDFsNoData().subscribe({
      next: (value) => {
        this.rowData = value;
      },
      error: () => {
        this.notificationService.notifyError();
      }
    })
  }
}
