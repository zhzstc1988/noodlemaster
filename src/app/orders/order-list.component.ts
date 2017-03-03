import { Table } from './../models/table';
import * as _ from 'lodash';
import { Recipe, Order, OrderList } from './../models/menu';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nm-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Input() orderList: OrderList;
  @Output() served = new EventEmitter<{tableId: string, order: Order}>();

  constructor() { }

  ngOnInit() {
  }

  orderServed() {
    let result: {[tableId: string]: Order} = {};
    _.forEach(this.orderList, (orders, recipeId) => {
      orders.forEach(order => {
        if (order.checked) {
          if (!result[order.tableId]) {
            result[order.tableId] = {};
            result[order.tableId][recipeId] = {
              quantity: 1,
              time: new Date()
            };
          } else if (!result[order.tableId][recipeId]) {
            result[order.tableId][recipeId] = {
              quantity: 1,
              time: new Date()
            };
          } else {
            result[order.tableId][recipeId].quantity++;
          }
        }
      });
    });
    _.forEach(result, (order, tableId) => {
      this.served.emit({tableId, order});
    });
    //console.log(result);
  }

}
