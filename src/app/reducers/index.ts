import { OrderList } from './../models/menu';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';

import * as _ from 'lodash';
import * as fromLayout from './layout.reducer';
import * as fromTables from './tables.reducer';
import * as fromMenu from './menu.reducer';
import * as fromPayments from './payment.reducer';
import * as fromIngredients from './ingredients.reducer';

export interface State {
  layout: fromLayout.State;
  tables: fromTables.State;
  menu:   fromMenu.State;
  payments: fromPayments.State;
  ingredients: fromIngredients.State;
}

export const reducers = {
  layout: fromLayout.reducer,
  tables: fromTables.reducer,
  menu: fromMenu.reducer,
  payments: fromPayments.reducer,
  ingredients: fromIngredients.reducer,
}

export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);

export const getTablesState = (state: State) => state.tables;
export const getTables = createSelector(getTablesState, fromTables.getTables);
export const getOccupiedTableIds = createSelector(getTablesState, fromTables.getOccupiedTableIds);
export const getSelectedTableId = createSelector(getTablesState, fromTables.getSelectedTableId);

export const getMenuState = (state: State) => state.menu;
export const getRecipes = createSelector(getMenuState, fromMenu.getRecipes);
export const getOrders = createSelector(getMenuState, fromMenu.getOrders);
export const getServedOrders = createSelector(getMenuState, fromMenu.getServedOrders);
export const getTableOrder =
  (tableId: string) => createSelector(getMenuState, fromMenu.getTableOrder(tableId));
export const getTableServedOrder =
  (tableId: string) => createSelector(getMenuState, fromMenu.getServedOrder(tableId));
export const getTableBill =
  (tableId: string) => createSelector(getRecipes, getTableOrder(tableId), (recipes, order) => {
    return recipes.filter(recipe => !!order[recipe.id] && order[recipe.id].quantity > 0)
      .map(recipe => recipe.price * order[recipe.id].quantity)
      .reduce((a, b) => (a + b), 0);
  });
export const getTableConfirm =
  (tableId: string) => createSelector(getMenuState, fromMenu.getConfirmedOrder(tableId));

export const getOrderList = createSelector(getOrders, getTables, getServedOrders, (orders, tables, servedOrders) => {
  let orderList: OrderList = {};
  _.forEach(orders, (value, tableId) => {
    _.forEach(orders[tableId], (order, recipeId) => {
      if (!orderList[recipeId]) {
        orderList[recipeId] = new Array();
      }
      for (let i = 0; i < order.quantity - servedOrders[tableId][recipeId].quantity; i++) {
        const item = {
          tableId: tableId,
          tableName: tables.find(table => table.id === tableId).name,
          checked: false,
          time: order.time
        };
        orderList[recipeId].push(item);
      }
    });
  });
  _.forEach(orderList, value => {
    value.sort(function(a,b){
      return a.time.getTime() - b.time.getTime();
    });
  });
  return orderList;
});

export const getPaymentsState = (state: State) => state.payments;
export const getPayments = createSelector(getPaymentsState, fromPayments.getPayments);

export const getIngredientsState = (state: State) => state.ingredients;
export const getIngredients = createSelector(getIngredientsState, fromIngredients.getIngredients);
export const getIngredientsQuantity = createSelector(
    getIngredientsState,
    fromIngredients.getQuantity
  );
