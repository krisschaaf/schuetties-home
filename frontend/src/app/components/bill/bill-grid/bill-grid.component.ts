import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BillPDF } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DownloadButtonCellRenderer } from './button-renderer/download-button-cell-renderer/download-button-cell-renderer.component';
import { PreviewButtonCellRendererComponent } from './button-renderer/preview-button-cell-renderer/preview-button-cell-renderer.component';
import { DeleteButtonCellRendererComponent } from './button-renderer/delete-button-cell-renderer/delete-button-cell-renderer.component';

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
    { field: 'name', headerName: 'Dateiname' },
    { field: 'customer.firstname', headerName: 'Vorname' },
    { field: 'customer.lastname', headerName: 'Nachname' },
    { field: 'creationDate', headerName: 'Erstellt am' },
    { field: 'id', headerName: 'Vorschau', cellRenderer: PreviewButtonCellRendererComponent, width: 140 },
    { field: 'id', headerName: 'Herunteladen', cellRenderer: DownloadButtonCellRenderer, width: 175 },
    { field: 'id', headerName: 'Löschen', cellRenderer: DeleteButtonCellRendererComponent, width: 135 },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  ngOnInit() {
    this.billService.subject.subscribe(x => {
      this.billService.getBillPDFs().subscribe({
        next: (value) => {
          this.rowData = value;
        },
        error: () => {
          this.notificationService.notify('Etwas ist schiefgelaufen. Bitte versuch es noch einmal.');
        }
      })
    })

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
