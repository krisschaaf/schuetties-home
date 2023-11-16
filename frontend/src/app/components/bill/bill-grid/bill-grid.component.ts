import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { BillPDF } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  onCellClicked($event: CellClickedEvent<any,any>) {
    throw new Error('Method not implemented.');
  }
}
