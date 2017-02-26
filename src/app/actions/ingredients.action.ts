import { Action } from '@ngrx/store';
import { type } from '../util';
import { Ingredient, IngredientQuantity, IngredientInfo } from './../models/ingredient';

export const ActionTypes = {
  CREATE_INGREDIENT: type('[Ingredient] Create'),
  INCREASE_INGREDIENT: type('[Ingredient] Add'),
  DECREASE_INGREDIENT: type('[Ingredient] Decrease'),
};

export class CreateIngredientAction implements Action {
  type = ActionTypes.CREATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class IncreaseIngredientAction implements Action {
  type = ActionTypes.INCREASE_INGREDIENT;

  constructor(public payload: IngredientInfo) {} // id: quantity
}

export class DecreaseIngredientAction implements Action {
  type = ActionTypes.DECREASE_INGREDIENT;

  constructor(public payload: IngredientQuantity) {}
}

export type Actions
  = CreateIngredientAction
  | IncreaseIngredientAction
  | DecreaseIngredientAction