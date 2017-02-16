import { Action } from '@ngrx/store';
import { type } from '../util';

import { Recipe } from './../models/menu';

export const ActionTypes = {
  INCREASE_RECIPE: type('[Menu] Increase Recipe'),
  DECREASE_RECIPE: type('[Menu] Decrease Recipe'),
  CONFIRM_ORDER: type('[Menu] Confirm Order'),
};

export class IncreaseRecipeAction implements Action {
  type = ActionTypes.INCREASE_RECIPE;

  constructor(public payload: {tableId: string, recipe: Recipe}) {}
}

export class DecreaseRecipeAction implements Action {
  type = ActionTypes.DECREASE_RECIPE;

  constructor(public payload: {tableId: string, recipe: Recipe}) {}
}

export class ConfirmOrderAction implements Action {
  type = ActionTypes.CONFIRM_ORDER;

  constructor(public payload: string) {} // tableId
}

export type Actions
  = IncreaseRecipeAction
  | DecreaseRecipeAction
  | ConfirmOrderAction