import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DeleteCustomerDialogComponent } from './delete-customer-dialog.component';

describe('DeleteCustomerDialogComponent', () => {
  let component: DeleteCustomerDialogComponent;
  let fixture: ComponentFixture<DeleteCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCustomerDialogComponent ],
      imports: [ HttpClientTestingModule, MatSnackBarModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
