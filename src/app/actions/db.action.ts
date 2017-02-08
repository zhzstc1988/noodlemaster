import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  SET_STATE: type('[DB] LOAD DATA')
}

export class LoadDataAction implements Action {
  type = ActionTypes.SET_STATE;

  constructor(public payload: any) {}
}