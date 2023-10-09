import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { NotificationService } from 'src/app/services/notification.service';

export interface CarDialogData {
  carId: '';
}

@Component({
  selector: 'app-delete-car-dialog',
  templateUrl: './delete-car-dialog.component.html',
  styleUrls: ['./delete-car-dialog.component.scss']
})
export class DeleteCarDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CarDialogData, 
    private carService: CarService, 
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onDeleteCar(): void {
    this.carService.deleteCarById(this.data.carId).subscribe({
        next: () => {
          this.notificationService.notify('Das Auto wurde erfolgreich gelöscht.');
          this.router.navigateByUrl('/cars');
        },
        error: () => {
          this.notificationService.notifyError();
        }
      })
  }
}
