import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-customer-grid',
  templateUrl: './customer-grid.component.html',
  styleUrls: ['./customer-grid.component.scss']
})
export class CustomerGridComponent {

  constructor(private customerService: CustomerService, private notificationService: NotificationService, private router: Router) { }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular
  public rowData!: Customer[];

  colDefs: ColDef[] = [
    { field: 'salutation', headerName: 'Anrede', width: 100 },
    { field: 'lastname', headerName: 'Nachname', width: 140 },
    { field: 'firstname', headerName: 'Vorname', width: 140 },
    { field: 'email', headerName: 'E-Mail' },
    { field: 'telephonePrivate', headerName: 'Telefon Privat', width: 150 },
    { field: 'telephoneBusiness', headerName: 'Telefon Gesch.', width: 150 },
    { field: 'mobile', headerName: 'Handy', width: 160 },
    { field: 'fax', headerName: 'Fax', width: 160 },
    { field: 'street', headerName: 'Straße' },
    { field: 'housingNumber', headerName: 'Nr.', width: 80 },
    { field: 'postalCode', headerName: 'PLZ', width: 100 },
    { field: 'city', headerName: 'Stadt', width: 120 },
    { field: 'bankNumber', headerName: 'Banknummer' },
    { field: 'additionalInformation', headerName: 'Sonstiges' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (value) => {
        this.rowData = value;
      },
      error: () => {
        this.notificationService.notify('Etwas ist schiefgelaufen. Bitte versuch es noch einmal.');
      }
    })
  }

  onCellClicked(event: CellClickedEvent) {
    this.router.navigate(
      ['/customer'],
      {
        queryParams: { 'id': event.data.id },
      },
    );
  }
}