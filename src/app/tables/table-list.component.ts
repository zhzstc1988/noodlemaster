import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Table } from './../models/table';

@Component({
  selector: 'nm-table-list',
  templateUrl: './table-list.component.html',
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
    div {
      align-self: flex-start;
      padding-top: 10px;
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
