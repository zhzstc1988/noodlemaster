import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Recipe, Order } from './../models/menu';
import * as fromRoot from '../reducers';
import * as fromMenu from '../actions/menu.action';

@Component({
  selector: 'nm-menu',
  template: `
    <h2>Menu</h2>
    <nm-menu-list
      [recipes]="recipes$ | async"
      [order]="order$ | async"
      [bill]="bill$ | async"
      (increaseRecipe)="changeRecipeQuantity($event, true)"
      (decreaseRecipe)="changeRecipeQuantity($event, false)"
    >
    </nm-menu-list>
  `,
})
export class MenuComponent implements OnInit, OnDestroy {

  private tableId: string;
  private recipes$: Observable<Recipe[]>;
  private order$: Observable<Order>;
  private bill$: Observable<number>;
  private sub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe(params => {
        this.tableId = params['tableId'] || '';
        this.recipes$ = this.store.select(fromRoot.getRecipes);
        this.order$ = this.store.select(fromRoot.getTableOrder(this.tableId));
        this.bill$ = this.store.select(fromRoot.getTableBill(this.tableId));
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changeRecipeQuantity(recipe: Recipe, increase: boolean) {
    if (increase) {
      this.store.dispatch(new fromMenu.IncreaseRecipeAction(
        { tableId: this.tableId, recipe: recipe }));
    } else {
      this.store.dispatch(new fromMenu.DecreaseRecipeAction(
        { tableId: this.tableId, recipe: recipe }));
    }
  }

}