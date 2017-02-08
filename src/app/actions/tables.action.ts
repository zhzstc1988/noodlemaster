import { Action } from '@ngrx/store';
import { Table } from '../models/table';
import { type } from '../util';

export const ActionTypes = {
  SELECT_TABLE: type('[Table] Select'),
  CONFIRM_TABLE: type('[Table] Confirm')
};

export class SelectAction implements Action {
  type = ActionTypes.SELECT_TABLE;

  constructor(public payload: string) {}
}

export class ConfirmAction implements Action {
  type = ActionTypes.CONFIRM_TABLE;

  constructor(public payload: string) {}
}

export type Actions
  = SelectAction
  | ConfirmAction