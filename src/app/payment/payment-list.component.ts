import { Component, OnInit, Input } from '@angular/core';

import { Payment } from './../models/payment';

@Component({
  selector: 'nm-payment-list',
  templateUrl: './payment-list.component.html',
  styles: []
})
export class PaymentListComponent implements OnInit {

  @Input() payments: Payment[];
  total: number;

  constructor() { }

  ngOnInit() {
    this.total = this.payments.map(payment => payment.amount).reduce((a, b) => a + b, 0);
  }

}
