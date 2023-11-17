import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDateCellRendererComponent } from './grid-date-cell-renderer.component';

describe('GridDateCellRendererComponent', () => {
  let component: GridDateCellRendererComponent;
  let fixture: ComponentFixture<GridDateCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDateCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDateCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
