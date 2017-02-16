import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';

import * as fromLayout from './layout.reducer';
import * as fromTables from './tables.reducer';
import * as fromMenu from './menu.reducer';

export interface State {
  layout: fromLayout.State;
  tables: fromTables.State;
  menu:   fromMenu.State;
}

export const reducers = {
  layout: fromLayout.reducer,
  tables: fromTables.reducer,
  menu: fromMenu.reducer,
}

export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);

export const getTablesState = (state: State) => state.tables;
export const getTables = createSelector(getTablesState, fromTables.getTables);
export const getOccupiedTableIds = createSelector(getTablesState, fromTables.getOccupiedTableIds);
export const getSelectedTableId = createSelector(getTablesState, fromTables.getSelectedTableId);

export const getMenuState = (state: State) => state.menu;
export const getRecipes = createSelector(getMenuState, fromMenu.getRecipes);
export const getTableOrder =
  (tableId: string) => createSelector(getMenuState, fromMenu.getTableOrder(tableId));
export const getTableBill =
  (tableId: string) => createSelector(getRecipes, getTableOrder(tableId), (recipes, order) => {
    return recipes.filter(recipe => !!order[recipe.id] && order[recipe.id] > 0)
      .map(recipe => recipe.price * order[recipe.id])
      .reduce((a, b) => (a + b), 0);
  })