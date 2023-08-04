import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

const DISABLED_ROUTES = [
  '/'
];

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent implements OnInit {
  disabled!: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {    
      if(val instanceof NavigationEnd) this.disabled = DISABLED_ROUTES.includes(this.router.url);
    });
  }

  backClicked() {
    // this._location.back();
    this.router.navigate([".."]);
  }

}
