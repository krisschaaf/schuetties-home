import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'download-button-cell-renderer',
    templateUrl: './download-button-cell-renderer.component.html',
    styleUrls: ['./download-button-cell-renderer.component.scss']
})
export class DownloadButtonCellRenderer implements ICellRendererAngularComp {
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