import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Table } from './../models/table';
import * as fromRoot from '../reducers';
import * as tableAction from '../actions/tables.action';

@Component({
  selector: 'nm-tables',
  template: `
    <h2>Select Table</h2>
    <nm-table-list
      [tables]="tables$ | async"
      [occupiedTableIds]="occupiedTableIds$ | async"
      [selectedTableId]="selectedTableId$ | async"
      (selectTable)="selectTable($event)"
      (confirmTable)="confirmTable($event)"
      (tableDetail)="showTableOrder($event)"
      (addTable)="addTable($event)"
      (removeTable)="removeTable($event)"
    >
    </nm-table-list>
  `,
  styles: []
})
export class TablesComponent implements OnInit {
  tables$: Observable<Table[]>;
  occupiedTableIds$: Observable<string[]>;
  selectedTableId$: Observable<string>;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {
    this.tables$ = store.select(fromRoot.getTables);
    this.occupiedTableIds$ = store.select(fromRoot.getOccupiedTableIds);
    this.selectedTableId$ = store.select(fromRoot.getSelectedTableId);
  }

  ngOnInit() {
  }

  addTable(table: Table) {
    this.store.dispatch(new tableAction.AddTableAction(table));
  }

  removeTable(tableId: string) {
    this.store.dispatch(new tableAction.DeleteTableAction(tableId));
  }

  selectTable(tableId: string) {
    this.store.dispatch(new tableAction.SelectAction(tableId));
  }

  showTableOrder(tableId: string) {
    const extras: NavigationExtras = {
      queryParams: {
        tableId
      }
    }
    this.router.navigate(['/menu'], extras);
  }

  confirmTable(tableId: string) {
    this.store.dispatch(new tableAction.ConfirmAction(tableId));
    this.showTableOrder(tableId);
  }

}