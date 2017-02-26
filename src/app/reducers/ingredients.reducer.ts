import * as _ from 'lodash';
import { Ingredient, IngredientQuantity } from './../models/ingredient';
import * as fromIngredient from './../actions/ingredients.action';
import * as menu from '../actions/menu.action';

export interface State {
  ingredients: Ingredient[];
  quantity: IngredientQuantity;
}

const initialState: State = {
  ingredients: [
    {
      id: '1',
      name: 'Duck'
    },
    {
      id: '2',
      name: 'Noodle'
    },
    {
      id: '3',
      name: 'Vegetable'
    },
    {
      id: '4',
      name: 'Water melon'
    }
  ],
  quantity: {
    '1': 10,
    '2': 20,
    '3': 1,
    '4': 2
  }
}

export function reducer(state: State = initialState, action: fromIngredient.Actions) {
  switch (action.type) {
    case fromIngredient.ActionTypes.CREATE_INGREDIENT:
      return Object.assign({}, state, {
        ingredients: [ ...state.ingredients, action.payload]
      });
    
    case fromIngredient.ActionTypes.INCREASE_INGREDIENT:
      const id = (action as fromIngredient.IncreaseIngredientAction).payload.id;
      const q = (action as fromIngredient.IncreaseIngredientAction).payload.quantity;
      return Object.assign({}, state, {
        quantity: Object.assign({}, state.quantity,
          {[id]: (state.quantity[id] || 0) + +q})
      });
    
    case fromIngredient.ActionTypes.DECREASE_INGREDIENT:
      let newQuantity: IngredientQuantity = {};
      _.forEach(state.quantity, (value, key) => {
        newQuantity[key] = value - (action.payload[key] || 0);
      });
      return Object.assign({}, state, { quantity: newQuantity });

    default:
      break;
  }
  return state;
}

export const getIngredients = (state: State) => state.ingredients;

export const getQuantity = (state: State) => state.quantity;