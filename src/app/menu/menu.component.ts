import { Ingredient, IngredientQuantity } from './../models/ingredient';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Recipe, Order } from './../models/menu';
import { Payment } from './../models/payment';
import * as fromRoot from '../reducers';
import * as fromMenu from '../actions/menu.action';
import * as fromIngredients from '../actions/ingredients.action';

@Component({
  selector: 'nm-menu',
  template: `
    <h2>Menu</h2>
    <nm-menu-list
      [tableId]="tableId"
      [recipes]="recipes$ | async"
      [ordered]="ordered$ | async"
      [served]="served$ | async"
      [bill]="bill$ | async"
      [confirmed]="confirmed$ | async"
      [ingredients]="ingredients$ | async"
      [ingredientQuantity]="quantity$ | async"
      (create)="createRecipe($event)"
      (confirm)="confirmOrder($event)"
      (cancel)="cancelOrder()"
      (decreaseIngredient)="decreaseIng($event)"
      (paybill)="paybill($event)"
    >
    </nm-menu-list>
  `,
})
export class MenuComponent implements OnInit, OnDestroy {

  private tableId: string;
  private recipes$: Observable<Recipe[]>;
  private ordered$: Observable<Order>;
  private served$: Observable<Order>;
  private bill$: Observable<number>;
  private confirmed$: Observable<boolean>;
  private ingredients$: Observable<Ingredient[]>;
  private quantity$: Observable<IngredientQuantity>;
  private sub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ingredients$ = this.store.select(fromRoot.getIngredients);
    this.quantity$ = this.store.select(fromRoot.getIngredientsQuantity);
  }

  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe(params => {
        this.tableId = params['tableId'] || '';
        this.recipes$ = this.store.select(fromRoot.getRecipes);
        this.ordered$ = this.store.select(fromRoot.getTableOrder(this.tableId));
        this.served$ = this.store.select(fromRoot.getTableServedOrder(this.tableId));
        this.bill$ = this.store.select(fromRoot.getTableBill(this.tableId));
        this.confirmed$ = this.store.select(fromRoot.getTableConfirm(this.tableId));
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createRecipe(recipe: Recipe) {
    this.store.dispatch(new fromMenu.CreateRecipeAction(recipe));
  }

  confirmOrder(order: Order) {
    const tableId = this.tableId;
    this.store.dispatch(new fromMenu.ConfirmOrderAction({
      tableId,
      order
    }));
    this.router.navigate(['/tables']);
  }

  cancelOrder() {
    this.store.dispatch(new fromMenu.CancelOrderAction(this.tableId));
    this.router.navigate(['/tables']);
  }

  decreaseIng(quantity: IngredientQuantity) {
    this.store.dispatch(new fromIngredients.DecreaseIngredientAction(quantity));
  }

  paybill(bill: number) {
    this.store.dispatch(new fromMenu.PayAction(
      new Payment(this.tableId, bill, null, new Date())
    ));
    this.router.navigate(['/tables']);
  }

}