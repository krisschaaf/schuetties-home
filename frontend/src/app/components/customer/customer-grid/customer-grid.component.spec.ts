import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CustomerGridComponent } from './customer-grid.component';

describe('CustomerGridComponent', () => {
  let component: CustomerGridComponent;
  let fixture: ComponentFixture<CustomerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGridComponent ],
      imports: [ HttpClientTestingModule, MatSnackBarModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
