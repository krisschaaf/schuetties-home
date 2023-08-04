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
    { field: 'salutation', headerName: 'Anrede' },
    { field: 'surname', headerName: 'Vorname' },
    { field: 'lastname', headerName: 'Nachname' },
    { field: 'email', headerName: 'E-Mail' },
    { field: 'telephonePrivate', headerName: 'Telefon Privat' },
    { field: 'telephoneBusiness', headerName: 'Telefon Gesch.' },
    { field: 'mobile', headerName: 'Handy' },
    { field: 'fax', headerName: 'Fax' },
    { field: 'street', headerName: 'Straße' },
    { field: 'housingNumber', headerName: 'Hausnummer' },
    { field: 'postalCode', headerName: 'PLZ' },
    { field: 'city', headerName: 'Stadt' },
    { field: 'bankNumber', headerName: 'Banknummer' },
    { field: 'additionalInformation', headerName: 'Sonstiges' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (value) => {
        this.rowData = value.data.data;
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