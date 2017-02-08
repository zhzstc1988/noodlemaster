import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Table } from './../models/table';
import * as fromRoot from '../reducers';
import * as tableAction from '../actions/tables.action';

@Component({
  selector: 'nm-tables',
  template: `
    <nm-table-list
      [tables]="tables$ | async"
      [occupiedTableIds]="occupiedTableIds$ | async"
      [selectedTableId]="selectedTableId$ | async"
      (selectTable)="selectTable($event)"
    >
    </nm-table-list>
  `,
  styles: []
})
export class TablesComponent implements OnInit {
  tables$: Observable<Table[]>;
  occupiedTableIds$: Observable<string[]>;
  selectedTableId$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.tables$ = store.select(fromRoot.getTables);
    this.occupiedTableIds$ = store.select(fromRoot.getOccupiedTableIds);
    this.selectedTableId$ = store.select(fromRoot.getSelectedTableId);
  }

  ngOnInit() {
    
  }

  selectTable(tableId: string) {
    this.store.dispatch(new tableAction.SelectAction(tableId));
  }

}