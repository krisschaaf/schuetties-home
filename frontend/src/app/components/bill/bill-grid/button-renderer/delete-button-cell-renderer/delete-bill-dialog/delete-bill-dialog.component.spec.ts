import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBillDialogComponent } from './delete-bill-dialog.component';

describe('DeleteBillDialogComponent', () => {
  let component: DeleteBillDialogComponent;
  let fixture: ComponentFixture<DeleteBillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBillDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
