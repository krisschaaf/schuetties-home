import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, CarDTO, Photo } from 'src/app/model/car';
import { Customer } from 'src/app/model/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DeleteCarDialogComponent } from './delete-car-dialog/delete-car-dialog.component';
import { Utils } from '../../utils/utils';
import { PhotoUtils } from '../../utils/photoUtils';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls: ['./show-car.component.scss']
})
export class ShowCarComponent implements OnInit{
  showCarForm!: FormGroup;
  car!: Car;
  file!: File
  photo!: Photo | null;
  customers!: Customer[]
  contentLoaded = false;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService, private customerService: CustomerService, private notificationService: NotificationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.queryParamMap.get('id');

    this.carService.getCarById(carId!).subscribe({
      next: (value) => {
        this.car = value;
        
        this.showCarForm = new FormGroup({
          customerFormControl: new FormControl(this.car.customer),
          makeFormControl: new FormControl(this.car.make),
          modelFormControl: new FormControl(this.car.model),
          yearFormControl: new FormControl(this.car.year),
          licenseFormControl: new FormControl(this.car.license),
          dateFormControl: new FormControl(this.car.date),
        });

        this.photo = value.photo

        this.contentLoaded = true;
      },
      error: () => {
          this.notificationService.notifyError();
      },
    })

    this.customerService.getCustomers().subscribe({
      error: () => {
        this.notificationService.notifyError();
      },
      next: (customers) => {
        this.customers = customers.sort(Utils.dynamicSort('lastname'));
      }
    })
  }

  get customerFormControl() {
    return this.showCarForm.get('customerFormControl') as FormControl;
  }

  get makeFormControl() {
    return this.showCarForm.get('makeFormControl') as FormControl;
  }

  get modelFormControl() {
    return this.showCarForm.get('modelFormControl') as FormControl;
  }

  get yearFormControl() {
    return this.showCarForm.get('yearFormControl') as FormControl;
  }

  get licenseFormControl() {
    return this.showCarForm.get('licenseFormControl') as FormControl;
  }

  get dateFormControl() {
    return this.showCarForm.get('dateFormControl') as FormControl;
  }

  onChangeCarFormHandler() {
    this.carService.editCarById(this.buildCar()).subscribe({
      next: () => {
        this.notificationService.notify('Die Änderungen wurden erfolgreich übernommen.');
        this.router.navigateByUrl('/cars');
      },
      error: () => {
        this.notificationService.notifyError();
      }
    });
  }

  buildCar(): Car {
    return {
      id: this.car.id,
      customer: this.customerFormControl.value,
      make: this.makeFormControl.value,
      model: this.modelFormControl.value,
      year: this.yearFormControl.value,
      license: this.licenseFormControl.value,
      date: this.dateFormControl.value,
      photo: this.photo ? this.photo : null,
    }
  }
  
  onFileChangedHandler(event: any) {
    this.file = event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    if (this.file) {
      this.carService.uploadImage(this.file).subscribe({
        error: () => {
          this.notificationService.notifyError();
          this.photo = null;
        },
        next: (photo: Photo) => {
          this.photo = photo;
        }
      })
    }
  }

  getPhotoSrc(): string {
    return PhotoUtils.getPhotoSrc(this.photo!);
  }

  onDeleteCar() {
    this.dialog.open(DeleteCarDialogComponent, {
      data: {
        carId: this.car.id
      }
    });
  }

  onGoToCustomer() {
    this.router.navigateByUrl(`/customer?id=${this.car.customer.id}`);
  }
}
