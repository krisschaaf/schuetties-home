import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { CarGridComponent } from './components/car/car-grid/car-grid.component';
import { ShowCarComponent } from './components/car/show-car/show-car.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { CustomerGridComponent } from './components/customer/customer-grid/customer-grid.component';
import { ShowCustomerComponent } from './components/customer/show-customer/show-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImpressumComponent } from './components/impressum/impressum.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'addCustomer', component: AddCustomerComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomerGridComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: ShowCustomerComponent, canActivate: [AuthGuard] },
  { path: 'addCar', component: AddCarComponent, canActivate: [AuthGuard] },
  { path: 'cars', component: CarGridComponent, canActivate: [AuthGuard] },
  { path: 'car', component: ShowCarComponent, canActivate: [AuthGuard] },
  { path: 'impressum', component: ImpressumComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
