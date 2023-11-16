import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillGridComponent } from './bill-grid.component';

describe('BillGridComponent', () => {
  let component: BillGridComponent;
  let fixture: ComponentFixture<BillGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
