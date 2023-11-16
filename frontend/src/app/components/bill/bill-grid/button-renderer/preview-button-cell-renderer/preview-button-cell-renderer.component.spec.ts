import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewButtonCellRendererComponent } from './preview-button-cell-renderer.component';

describe('PreviewButtonCellRendererComponent', () => {
  let component: PreviewButtonCellRendererComponent;
  let fixture: ComponentFixture<PreviewButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewButtonCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
