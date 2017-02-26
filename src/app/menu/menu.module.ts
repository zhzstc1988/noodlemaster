import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { DialogsModule } from './../dialogs/dialogs.module';
import { MenuComponent } from './menu.component';
import { MenuListComponent } from './menu-list.component';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule.forRoot(),
    DialogsModule
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    MenuComponent,
    MenuListComponent
  ],
})
export class MenuModule { }