import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Table } from './../models/table';

@Component({
  selector: 'nm-table-list',
  templateUrl: './table-list.component.html',
  styles: [`
    .table-index {
      font-weight: bold;
    }
    md-grid-tile-footer {
      justify-content: center;
      align-items: center;
    }
    .occupied-table {
      color: red;
    }
    .selected-table {
      color: green;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    img {
      height: 100%;
    }
  `]
})
export class TableListComponent {
  @Input() tables: Table[];
  @Input() occupiedTableIds: string[];
  @Input() selectedTableId: string;
  @Output() selectTable = new EventEmitter<string>();
  @Output() confirmTable = new EventEmitter<string>();
  @Output() tableDetail = new EventEmitter<string>();

  doSelectTable(tableId: string) {
    if (this.occupiedTableIds.indexOf(tableId) === -1) {
      this.selectTable.emit(tableId);
    } else {
      this.tableDetail.emit(tableId);
    }
  }
}
