import { Action } from '@ngrx/store';
import { type } from '../util';

import { Recipe, Order } from './../models/menu';
import { Payment } from './../models/payment';

export const ActionTypes = {
  CREATE_RECIPE: type('[Menu] Create Recipe'),
  CONFIRM_ORDER: type('[Menu] Confirm Order'),
  CANCEL_ORDER: type('[Menu] Cancel Order'),
  PAY_ORDER: type('[Menu] Pay Order'),
};

export class CreateRecipeAction implements Action {
  type = ActionTypes.CREATE_RECIPE;

  constructor(public payload: Recipe) {}
}

export class ConfirmOrderAction implements Action {
  type = ActionTypes.CONFIRM_ORDER;

  constructor(public payload: {tableId: string, order: Order}) {} // order array
}

export class CancelOrderAction implements Action {
  type = ActionTypes.CANCEL_ORDER;

  constructor(public payload: string) {} // tableId
}

export class PayAction implements Action {
  type = ActionTypes.PAY_ORDER;

  constructor(public payload: Payment) {} // payment
}

export type Actions
  = CreateRecipeAction
  | ConfirmOrderAction
  | CancelOrderAction
  | PayAction