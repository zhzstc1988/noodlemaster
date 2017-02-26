import { Payment } from '../models/payment';
import { createSelector } from 'reselect';
import * as menu from '../actions/menu.action';

export interface State {
  payments: Payment[],
}

const initialState: State = {
  payments: [],
}

export function reducer(state: State = initialState, action: menu.Actions) {
  switch (action.type) {
    case menu.ActionTypes.PAY_ORDER:
      return Object.assign({}, state, {
        payments: [ ...state.payments, (action as menu.PayAction).payload ]
      });
    default:
      break;
  }
  return state;
}

export const getPayments = (state: State) => state.payments;