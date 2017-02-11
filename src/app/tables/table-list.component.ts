import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Table } from './../models/table';

@Component({
  selector: 'nm-table-list',
  templateUrl: './table-list.component.html',
  styles: [`
    h4 {
      align-self: flex-start;
      padding-top: 10px;
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
  `]
})
export class TableListComponent {
  @Input() tables: Table[];
  @Input() occupiedTableIds: string[];
  @Input() selectedTableId: string;
  @Output() selectTable = new EventEmitter<string>();
}
