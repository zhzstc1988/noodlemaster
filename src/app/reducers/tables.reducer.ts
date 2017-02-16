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
        img: "http://retaildesignblog.net/wp-content/uploads/2012/09/SABOTEN-cutlet-restaurant-DOYLE-COLLECTION-Fukuoka-02.jpg",
        nrofSeats: 3
      },
      {
        id: '3',
        img: "http://annarborcivicballet.com/images/American-retro-old-wooden-tables-and-chairs-wrought-iron-bar-lounge-restaurant-outdoor-cafe-tables-Furniture.jpg",
        nrofSeats: 5
      },
      {
        id: '4',
        img: "http://www.bizbash.com/content/editorial/StoryPhoto/big/e17927image1.jpg",
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
        return Object.assign({}, state,
          {selectedTableId: null},
          {occupiedTableIds: [ ...state.occupiedTableIds, action.payload]}
        );
      }
      break;
  }
  return state;
}

export const getTables = (state: State) => state.tables;

export const getOccupiedTableIds = (state: State) => state.occupiedTableIds;

export const getSelectedTableId = (state: State) => state.selectedTableId;