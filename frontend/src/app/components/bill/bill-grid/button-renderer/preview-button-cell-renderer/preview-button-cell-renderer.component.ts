import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { PreviewBillDialogComponent } from './preview-bill-dialog/preview-bill-dialog.component';

@Component({
  selector: 'app-preview-button-cell-renderer',
  templateUrl: './preview-button-cell-renderer.component.html',
  styleUrls: ['./preview-button-cell-renderer.component.scss']
})
export class PreviewButtonCellRendererComponent implements ICellRendererAngularComp {
  public cellValue!: string;

  constructor(private dialog: MatDialog) {}

  agInit(params: ICellRendererParams): void {
    this.cellValue = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = params.value;
    return true;
  }

  btnClickedHandler() {
    if(!this.cellValue) {
      console.log('No ID for this bill found.');
    } else {
      this.dialog.open(PreviewBillDialogComponent, {
        data: {
          id: this.cellValue
        },
        width: '80%'
      });
    }
  }
}