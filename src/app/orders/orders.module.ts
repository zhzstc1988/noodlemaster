import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    MaterialModule.forRoot(),
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    OrdersComponent,
    OrderListComponent
  ]
})
export class OrdersModule { }