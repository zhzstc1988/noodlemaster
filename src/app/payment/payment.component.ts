import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Payment } from './../models/payment';
import * as fromRoot from '../reducers';
import * as fromMenu from '../actions/menu.action';

@Component({
  selector: 'nm-payment',
  template: `
    <h2>Payments</h2>
    <nm-payment-list
      [payments]="payments$ | async"
    >
    </nm-payment-list>
  `,
  styles: [],
})
export class PaymentComponent implements OnInit {

  payments$: Observable<Payment[]>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.payments$ = store.select(fromRoot.getPayments);
  }

  ngOnInit() {
  }

}