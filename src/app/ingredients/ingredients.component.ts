import { Payment } from './../models/payment';
import { Ingredient, IngredientQuantity, IngredientInfo } from './../models/ingredient';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromMenu from '../actions/menu.action';
import * as fromIngredients from '../actions/ingredients.action';

@Component({
  selector: 'nm-ingredients',
  template: `
    <nm-ingredients-list
      [ingredients]="ingredients$ | async"
      [quantity]="quantity$ | async"
      (ingredientCreated)="createIngredient($event)"
      (ingredientIncreased)="increaseIngredient($event)"
    >
    </nm-ingredients-list>
  `,
  styles: []
})
export class IngredientsComponent implements OnInit {

  private ingredients$: Observable<Ingredient[]>;
  private quantity$: Observable<IngredientQuantity>;

  constructor(private store: Store<fromRoot.State>) {
    this.ingredients$ = store.select(fromRoot.getIngredients);
    this.quantity$ = store.select(fromRoot.getIngredientsQuantity);
  }

  ngOnInit() {
  }

  createIngredient(ingredient: Ingredient) {
    this.store.dispatch(new fromIngredients.CreateIngredientAction(ingredient));
  }

  increaseIngredient(value: IngredientInfo) {
    this.store.dispatch(new fromIngredients.IncreaseIngredientAction(value));
    this.store.dispatch(new fromMenu.PayAction(new Payment('', -value.price * value.quantity, value.name, new Date())));
  }

}