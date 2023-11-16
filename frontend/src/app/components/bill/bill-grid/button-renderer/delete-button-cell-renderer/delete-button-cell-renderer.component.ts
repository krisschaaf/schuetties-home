import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DeleteBillDialogComponent } from './delete-bill-dialog/delete-bill-dialog.component';

@Component({
  selector: 'app-delete-button-cell-renderer',
  templateUrl: './delete-button-cell-renderer.component.html',
  styleUrls: ['./delete-button-cell-renderer.component.scss']
})
export class DeleteButtonCellRendererComponent implements ICellRendererAngularComp {
  public cellValue!: string;

  constructor(
    private dialog: MatDialog) { }

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
      this.dialog.open(DeleteBillDialogComponent, {
        data: {
          billId: this.cellValue
        }
      });
    }
  }

  
}