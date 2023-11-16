import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-preview-button-cell-renderer',
  templateUrl: './preview-button-cell-renderer.component.html',
  styleUrls: ['./preview-button-cell-renderer.component.scss']
})
export class PreviewButtonCellRendererComponent implements ICellRendererAngularComp {
  public cellValue!: string;

  agInit(params: ICellRendererParams): void {
    this.cellValue = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = params.value;
    return true;
  }

  btnClickedHandler() {
    throw new Error('To be implemented...');
  }
}