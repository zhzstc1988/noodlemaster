import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablesComponent } from './tables.component';

const tablesRoutes: Routes = [
  { path: 'tables', component: TablesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(tablesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TableRoutingModule { }