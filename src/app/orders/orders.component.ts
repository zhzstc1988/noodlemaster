import { Table } from './../models/table';
import { Recipe, Order, OrderList } from './../models/menu';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from '../reducers';
import * as fromMenu from '../actions/menu.action';

@Component({
  selector: 'nm-orders',
  template: `
    <h2>Order List</h2>
    <nm-order-list
      [recipes]="recipes$ | async"
      [orderList]="orders$ | async"
      (served)="orderServed($event)"
    >
    </nm-order-list>
  `,
  styles: []
})
export class OrdersComponent implements OnInit {

  recipes$: Observable<Recipe[]>;
  orders$: Observable<OrderList>;

  constructor(private store: Store<fromRoot.State>) {
    this.recipes$ = store.select(fromRoot.getRecipes);
    this.orders$ = store.select(fromRoot.getOrderList);
  }

  ngOnInit() {
  }

  orderServed(order: {tableId: string, order: Order}) {
    this.store.dispatch(new fromMenu.ServeOrderAction(order));
  }

}