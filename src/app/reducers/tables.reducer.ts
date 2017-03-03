import { Table } from './../models/table';
import * as tables from '../actions/tables.action';
import * as menu from '../actions/menu.action';

export interface State {
  tables: Table[];
  occupiedTableIds: string[];
  selectedTableId: string;
}

const initialState : State = {
  tables: [],
  occupiedTableIds: [],
  selectedTableId: null,
};

export function reducer(state = initialState, action: tables.Actions | menu.Actions) {
  switch (action.type) {
    case tables.ActionTypes.ADD_TABLE:
      let addAction = action as tables.AddTableAction;
      return Object.assign({}, state, {
        tables: [ ...state.tables, addAction.payload]
      });
    
    case tables.ActionTypes.DELETE_TABLE:
      let delAction = action as tables.DeleteTableAction;
      return Object.assign({}, state, {
        tables: state.tables.filter(table => table.id !== delAction.payload)
      });
    
    case tables.ActionTypes.SELECT_TABLE:
      if (state.tables.findIndex(table => table.id === action.payload) > -1) {
        return Object.assign({}, state, {selectedTableId: action.payload});
      }
      break;
    
    case tables.ActionTypes.CONFIRM_TABLE:
      if (state.tables.findIndex(table => table.id === action.payload) > -1) {
        return Object.assign({}, state,
          {selectedTableId: null},
          {occupiedTableIds: [ ...state.occupiedTableIds, action.payload]}
        );
      }
      break;
    
    case menu.ActionTypes.CANCEL_ORDER: {
      const tableId = (action as menu.CancelOrderAction).payload;
      return Object.assign({}, state, {
        occupiedTableIds: state.occupiedTableIds.filter(id => id !== tableId)
      });
    }

    case menu.ActionTypes.PAY_ORDER: {
      const tableId = (action as menu.PayAction).payload.id;
      return Object.assign({}, state, {
        tables: state.tables.filter(table => table.id !== tableId),
        occupiedTableIds: state.occupiedTableIds.filter(id => id !== tableId)
      });
    }
  }
  return state;
}

export const getTables = (state: State) => state.tables;

export const getOccupiedTableIds = (state: State) => state.occupiedTableIds;

export const getSelectedTableId = (state: State) => state.selectedTableId;