import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { MenuListComponent } from './menu-list.component';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule.forRoot(),
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    MenuComponent,
    MenuListComponent,
  ]
})
export class MenuModule { }