import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

interface MenuTile {
  basePath: string;
  cssClass: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  isLoggedIn!: boolean;
  menuTiles: MenuTile[] = [
    {
      basePath: '/customers',
      cssClass: 'dashboard__withAuth--tile tiles--customer',
      title: 'Kunde',
      subtitle: 'Kunden verwalten',
    },
    {
      basePath: '/addCustomer',
      cssClass: 'dashboard__withAuth--tile tiles--customer',
      title: 'Kunde',
      subtitle: 'Neuen Kunden hinzufügen',
    },
    {
      basePath: '/cars',
      cssClass: 'dashboard__withAuth--tile tiles--car',
      title: 'Autos',
      subtitle: 'Autos verwalten',
    },
    {
      basePath: '/addCar',
      cssClass: 'dashboard__withAuth--tile tiles--car',
      title: 'Autos',
      subtitle: 'Neues Auto hinzufügen',
    },
  ]

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((result) => {
      this.isLoggedIn = result;
    })
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
}
