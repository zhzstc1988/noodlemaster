import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import * as fromLayout from './layout.reducer';
import * as fromTables from './tables.reducer';

export interface State {
  layout: fromLayout.State;
  tables: fromTables.State;
}

export const reducers = {
  layout: fromLayout.reducer,
  tables: fromTables.reducer,
}

export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);

export const getTablesState = (state: State) => state.tables;
export const getTables = createSelector(getTablesState, fromTables.getTables);
export const getOccupiedTableIds = createSelector(getTablesState, fromTables.getOccupiedTableIds);
export const getSelectedTableId = createSelector(getTablesState, fromTables.getSelectedTableId);