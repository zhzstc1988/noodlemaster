import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentListComponent } from './payment-list.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialModule.forRoot(),
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    PaymentComponent,
    PaymentListComponent
  ]
})
export class PaymentModule { }