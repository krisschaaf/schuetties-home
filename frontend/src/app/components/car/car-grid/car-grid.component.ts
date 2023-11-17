import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/services/car.service';
import { NotificationService } from 'src/app/services/notification.service';
import { GridDateCellRendererComponent } from '../../utils/grid-date-cell-renderer/grid-date-cell-renderer.component';

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
    { field: 'customer.salutation', headerName: 'Anrede', width: 100 },
    { field: 'customer.lastname', headerName: 'Nachname', width: 140 },
    { field: 'customer.firstname', headerName: 'Vorname', width: 140 },
    { field: 'make', headerName: 'Marke', width: 140 },
    { field: 'model', headerName: 'Modell', width: 120 },
    { field: 'year', headerName: 'Bj.', width: 100 },
    { field: 'license', headerName: 'Kennzeichen', width: 140 },
    { field: 'date', headerName: 'Eingelagert am', cellRenderer: GridDateCellRendererComponent, width: 160 },
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
      ['/car'],
      {
        queryParams: { 'id': event.data.id },
      },
    );
  }
}
