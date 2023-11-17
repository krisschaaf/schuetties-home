import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBillDialogComponent } from './preview-bill-dialog.component';

describe('PreviewBillDialogComponent', () => {
  let component: PreviewBillDialogComponent;
  let fixture: ComponentFixture<PreviewBillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBillDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
