import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients.component';

const ingredientsRoutes: Routes = [
  {
    path: '', component: IngredientsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ingredientsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IngredientsRoutingModule { }