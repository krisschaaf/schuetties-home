import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-date-cell-renderer',
  templateUrl: './grid-date-cell-renderer.component.html',
  styleUrls: ['./grid-date-cell-renderer.component.scss']
})
export class GridDateCellRendererComponent {
  date!: string
  
  agInit(params: ICellRendererParams): void {
      this.date = this.createDateString(params.value);
  }

  refresh(params: ICellRendererParams): boolean {
      this.date = this.createDateString(params.value);
      return true;
  }

  createDateString(date: string): string {
    const dateAsType = new Date(date);
    return `${dateAsType.getDate()}.${dateAsType.getMonth() + 1}.${dateAsType.getFullYear()}`;
  }
}
