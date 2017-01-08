import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';

@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule
  ],
  declarations: [TablesComponent]
})
export class TablesModule { }