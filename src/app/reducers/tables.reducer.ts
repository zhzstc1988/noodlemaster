import { Table } from './../models/table';
import { createSelector } from 'reselect';
import * as tables from '../actions/tables.action';

export interface State {
  tables: Table[];
  occupiedTableIds: string[];
  selectedTableId: string;
}

const initialState : State = {
  tables: [
      {id: '1', nrofSeats: 4},
      {id: '2', nrofSeats: 3},
      {id: '3', nrofSeats: 5},
      {id: '4', nrofSeats: 6},
    ],
  occupiedTableIds: [],
  selectedTableId: null,
};

export function reducer(state = initialState, action: tables.Actions) {
  switch (action.type) {
    case tables.ActionTypes.SELECT_TABLE:
      if (state.tables.findIndex(table => table.id == action.payload) > -1) {
        return Object.assign({}, state, {selectedTableId: action.payload});
      }
      break;
    case tables.ActionTypes.CONFIRM_TABLE:
      if (state.tables.findIndex(table => table.id == action.payload) > -1) {
        return Object.assign({}, state, {occupiedTableIds: [ ...state.occupiedTableIds, action.payload]});
      }
      break;
  }
  return state;
}

export const getTables = (state: State) => state.tables;

export const getOccupiedTableIds = (state: State) => state.occupiedTableIds;

export const getSelectedTableId = (state: State) => state.selectedTableId;