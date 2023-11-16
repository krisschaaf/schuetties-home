import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgGridModule } from 'ag-grid-angular';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { CustomerGridComponent } from './components/customer/customer-grid/customer-grid.component';
import { ShowCustomerComponent } from './components/customer/show-customer/show-customer.component';
import { DeleteCustomerDialogComponent } from './components/customer/show-customer/delete-customer-dialog/delete-customer-dialog.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { CarGridComponent } from './components/car/car-grid/car-grid.component';
import { ShowCarComponent } from './components/car/show-car/show-car.component';
import { DeleteCarDialogComponent } from './components/car/show-car/delete-car-dialog/delete-car-dialog.component';
import { CreateBillComponent } from './components/bill/create-bill/create-bill.component';
import { ErrorInterceptor } from './interceptors/http.interceptor';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { BillGridComponent } from './components/bill/bill-grid/bill-grid.component';
import { DownloadButtonCellRenderer } from './components/bill/bill-grid/button-renderer/download-button-cell-renderer/download-button-cell-renderer.component';
import { PreviewButtonCellRendererComponent } from './components/bill/bill-grid/button-renderer/preview-button-cell-renderer/preview-button-cell-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AddCustomerComponent,
    ImpressumComponent,
    CustomerGridComponent,
    ShowCustomerComponent,
    DeleteCustomerDialogComponent,
    GoBackComponent,
    AddCarComponent,
    CarGridComponent,
    ShowCarComponent,
    DeleteCarDialogComponent,
    CreateBillComponent,
    ContactAdminComponent,
    BillGridComponent,
    DownloadButtonCellRenderer,
    PreviewButtonCellRendererComponent
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    TextFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    AgGridModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
