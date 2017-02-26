import { Action } from '@ngrx/store';
import { Table } from '../models/table';
import { type } from '../util';

export const ActionTypes = {
  ADD_TABLE: type('[Table] Add'),
  DELETE_TABLE: type('[Table] Delete'),
  SELECT_TABLE: type('[Table] Select'),
  CONFIRM_TABLE: type('[Table] Confirm'),
};

export class SelectAction implements Action {
  type = ActionTypes.SELECT_TABLE;

  constructor(public payload: string) {}
}

export class ConfirmAction implements Action {
  type = ActionTypes.CONFIRM_TABLE;

  constructor(public payload: string) {}
}

export class AddTableAction implements Action {
  type = ActionTypes.ADD_TABLE;

  constructor(public payload: Table) {}
}

export class DeleteTableAction implements Action {
  type = ActionTypes.DELETE_TABLE;

  constructor(public payload: string) {} // tableId
}

export type Actions
  = AddTableAction
  | DeleteTableAction
  | SelectAction
  | ConfirmAction