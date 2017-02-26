import { DialogsModule } from './../dialogs/dialogs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { TableRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { TableListComponent } from './table-list.component';

@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule,
    DialogsModule,
    MaterialModule.forRoot(),
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    TablesComponent,
    TableListComponent
  ],
})
export class TablesModule { }