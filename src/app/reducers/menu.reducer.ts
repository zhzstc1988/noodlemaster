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
}

const initialState : State = {
  recipes: [
    {
      id: '1',
      name: 'Duck Soup',
      price: 8,
      img: '',
      ingredients: {
        'duckId': 1,
        'waterid': 3,
      },
    },
    {
      id: '2',
      name: 'Vegetable Soup',
      price: 6,
      img: '',
      ingredients: {
        'vegetableId': 1,
        'waterid': 3,
      },
    },
  ],
  orders: {},
  servedOrders: {},
}

function changeRecipeQuantity(state: {[tableId: string]: Order},
                              action: menu.IncreaseRecipeAction | menu.DecreaseRecipeAction,
                              increase: boolean) {
  const payload = action.payload;
  const tableId = payload.tableId;
  const recipeId = payload.recipe.id;
  let orders = JSON.parse(JSON.stringify(state));
  orders[tableId] = orders[tableId] || {};
  const quantity = orders[tableId][recipeId] || 0;
  if (increase) {
    orders[tableId][recipeId] = quantity + 1;
  } else if (quantity > 0) {
    orders[tableId][recipeId] = quantity - 1;
    if (quantity === 1) {
      delete orders[tableId][recipeId];
    }
  }
  return orders;
}

export function reducer(state: State = initialState, action: menu.Actions) {
  switch (action.type) {
    case menu.ActionTypes.INCREASE_RECIPE: {
      return  Object.assign({}, state, {
        orders: changeRecipeQuantity(state.orders, action as menu.IncreaseRecipeAction, true)
      });
    }
    case menu.ActionTypes.DECREASE_RECIPE: {
      return Object.assign({}, state, {
        orders: changeRecipeQuantity(state.orders, action as menu.DecreaseRecipeAction, false)
      });
    }
  }
  return state;
}

export const getRecipes = (state: State) => state.recipes;

export const getOrders = (state: State) => state.orders;

export const getTableOrder = (tableId: string) => (state: State) => state.orders[tableId] || {};

export const getServedOrder = (tableId: string) => (state: State) => state.servedOrders[tableId] || {};