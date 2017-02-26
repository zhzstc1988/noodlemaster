import { DialogsModule } from './../dialogs/dialogs.module';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
import { IngredientsListComponent } from './ingredients-list.component';

@NgModule({
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    MaterialModule.forRoot(),
    DialogsModule
  ],
  declarations: [
    IngredientsComponent,
    IngredientsListComponent
  ]
})
export class IngredientsModule { }