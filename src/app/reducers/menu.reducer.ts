import * as _ from 'lodash';
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
      const confirmAction = action as menu.ConfirmOrderAction;
      let servedOrders: {[tableId: string]: Order} = {};
      const tableId = (action as menu.ConfirmOrderAction).payload.tableId;
      servedOrders[tableId] = _.cloneDeep(confirmAction.payload.order);
      for (let key in servedOrders[tableId]) {
        servedOrders[tableId][key] = {quantity: 0, time: null};
      }
      return Object.assign({}, state, {
        orders: Object.assign({}, state.orders, {
          [tableId]: mergeOrders(state.orders[tableId], confirmAction.payload.order)
        }),
        servedOrders: Object.assign({}, state.servedOrders, {
          [tableId]: mergeOrders(state.servedOrders[tableId], servedOrders[tableId])
        }),
        confirmedOrders: Object.assign({}, state.confirmedOrders, {[tableId]: true}),
      });
    }

    case menu.ActionTypes.SERVE_ORDER: {
      const serveAction = action as menu.ServeOrderAction;
      const tableId = serveAction.payload.tableId;
      const order = serveAction.payload.order;
      const newState = _.cloneDeep(state);
      _.forEach(order, (value, recipeId) => {
        newState.servedOrders[tableId][recipeId].quantity += value.quantity;
      });
      return newState;
    }

    case menu.ActionTypes.PAY_ORDER: {
      const tableId = (action as menu.PayAction).payload.id;
      if (!tableId) {
        break;
      }
      let newState: State = _.cloneDeep(state);
      delete newState.orders[tableId];
      delete newState.confirmedOrders[tableId];
      delete newState.servedOrders[tableId];
      return newState;
    }
  }
  return state;
}

function mergeOrders(o1: Order, o2: Order): Order {
  if (!o1) return o2;
  if (!o2) return o1;
  let result = Object.assign({}, o1, o2);
  _.forEach(result, (value, recipeId) => {
    const q1 = (o1[recipeId] && o1[recipeId].quantity) || 0;
    const q2 = (o2[recipeId] && o2[recipeId].quantity) || 0;
    const t1 = o1[recipeId] && o1[recipeId].time;
    const t2 = o2[recipeId] && o2[recipeId].time;
    let time: Date;
    if (!t1) time = t2;
    else if (!t2) time = t1;
    else time = t1.getTime() > t2.getTime() ? t1 : t2;
    result[recipeId] = {
      quantity: q1 + q2,
      time: time
    };
  });
  return result;
}

export const getRecipes = (state: State) => state.recipes;

export const getOrders = (state: State) => state.orders;

export const getServedOrders = (state: State) => state.servedOrders;

export const getTableOrder = (tableId: string) => (state: State) => state.orders[tableId] || {};

export const getServedOrder = (tableId: string) => (state: State) => state.servedOrders[tableId] || {};

export const getConfirmedOrder = (tableId: string) => (state: State) => state.confirmedOrders[tableId];