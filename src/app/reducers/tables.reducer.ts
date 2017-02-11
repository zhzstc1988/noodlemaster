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
      {
        id: '1',
        img: "https://s-media-cache-ak0.pinimg.com/564x/25/95/fa/2595fa0364f3f36062ebd15391e86c31.jpg",
        nrofSeats: 4
      },
      {
        id: '2',
        img: "https://s-media-cache-ak0.pinimg.com/236x/db/2c/6c/db2c6c41d5c5cf72be68b36df85e922e.jpg",
        nrofSeats: 3
      },
      {
        id: '3',
        img: "http://annarborcivicballet.com/images/American-retro-old-wooden-tables-and-chairs-wrought-iron-bar-lounge-restaurant-outdoor-cafe-tables-Furniture.jpg",
        nrofSeats: 5
      },
      {
        id: '4',
        img: "http://g01.a.alicdn.com/kf/HTB1ht1QIpXXXXaVaXXXq6xXFXXXL/Kentucky-Fried-Chicken-fast-food-tables-and-chairs-tables-and-chairs-wholesale-tea-shop-cafe-restaurant.jpg",
        nrofSeats: 6
      },
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