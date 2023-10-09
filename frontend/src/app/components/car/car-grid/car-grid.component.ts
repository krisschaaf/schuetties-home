import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/services/car.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-car-grid',
  templateUrl: './car-grid.component.html',
  styleUrls: ['./car-grid.component.scss']
})
export class CarGridComponent {

  constructor(private carService: CarService, private notificationService: NotificationService, private router: Router) { }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular
  public rowData!: Car[];

  colDefs: ColDef[] = [
    { field: 'customer.salutation', headerName: 'Anrede' },
    { field: 'customer.firstname', headerName: 'Vorname' },
    { field: 'customer.lastname', headerName: 'Nachname' },
    { field: 'make', headerName: 'Marke' },
    { field: 'model', headerName: 'Modell' },
    { field: 'year', headerName: 'Baujahr' },
    { field: 'license', headerName: 'Kennzeichen' },
    { field: 'date', headerName: 'Eingelagert am' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  ngOnInit() {
    this.carService.getCars().subscribe({
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
