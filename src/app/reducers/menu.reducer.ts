import { Recipe, Order } from './../models/menu';

import * as menu from './../actions/menu.action';

export interface State {
  recipes: Recipe[];
  orders: {
    [tableId: string]: Order;
  };
  servedOrders: {
    [tableId: string]: Order;
  }
  confirmedOrders: {
    [tableId: string]: boolean;
  }
}

const initialState : State = {
  recipes: [
    {
      id: '1',
      name: 'Duck Soup',
      price: 8,
      img: '',
      ingredients: {
        '1': 1,
        '2': 3,
      },
    },
    {
      id: '2',
      name: 'Vegetable Soup',
      price: 6,
      img: '',
      ingredients: {
        '3': 1,
        '2': 3,
      },
    },
  ],
  orders: {},
  servedOrders: {},
  confirmedOrders: {},
}

export function reducer(state: State = initialState, action: menu.Actions) {
  switch (action.type) {
    case menu.ActionTypes.CREATE_RECIPE: {
      return Object.assign({}, state, {
        recipes: [ ...state.recipes, action.payload]
      });
    }

    case menu.ActionTypes.CONFIRM_ORDER: {
      let confirmAction = action as menu.ConfirmOrderAction;
      let servedOrders: {[tableId: string]: Order} = {};
      const tableId = (action as menu.ConfirmOrderAction).payload.tableId;
      servedOrders[tableId] = JSON.parse(JSON.stringify(
        confirmAction.payload.order
      ));
      for (let key in servedOrders[tableId]) {
        servedOrders[tableId][key] = 0;
      }
      return Object.assign({}, state, {
        orders: Object.assign({}, state.orders, {[tableId]: confirmAction.payload.order}),
        servedOrders: Object.assign({}, state.servedOrders, {[tableId]: servedOrders[tableId]}),
        confirmedOrders: Object.assign({}, state.confirmedOrders, {[tableId]: true}),
      });
    }

    case menu.ActionTypes.PAY_ORDER: {
      const tableId = (action as menu.PayAction).payload.id;
      let newState: State = JSON.parse(JSON.stringify(state));
      delete newState.orders[tableId];
      delete newState.confirmedOrders[tableId];
      delete newState.servedOrders[tableId];
      return newState;
    }
  }
  return state;
}

export const getRecipes = (state: State) => state.recipes;

export const getOrders = (state: State) => state.orders;

export const getTableOrder = (tableId: string) => (state: State) => state.orders[tableId] || {};

export const getServedOrder = (tableId: string) => (state: State) => state.servedOrders[tableId] || {};

export const getConfirmedOrder = (tableId: string) => (state: State) => state.confirmedOrders[tableId];