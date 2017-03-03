import { Table } from './../models/table';
import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { DialogsService } from './../dialogs/dialogs.service';
import { Recipe, Order } from './../models/menu';
import { Ingredient, IngredientQuantity } from './../models/ingredient';
const uuidV4 = require('uuid/v4');

@Component({
  selector: 'nm-menu-list',
  templateUrl: './menu-list.component.html',
  styles: []
})
export class MenuListComponent implements OnInit {

  @Input() tableId: string;
  @Input() tables: Table[];
  @Input() recipes: Recipe[];
  @Input() ordered: Order;
  @Input() served: Order;
  @Input() bill: number;
  @Input() confirmed: boolean;
  @Input() ingredients: Ingredient[];
  @Input() ingredientQuantity: IngredientQuantity;
  @Output() create = new EventEmitter<Recipe>();
  @Output() confirm = new EventEmitter<Order>();
  @Output() cancel = new EventEmitter();
  @Output() decreaseIngredient = new EventEmitter<IngredientQuantity>();
  @Output() paybill = new EventEmitter<{tableName: string, bill: number}>();

  private order: Order;

  constructor(
    private dialogService: DialogsService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.order = {};
  }

  ngOnInit() {
    this.initializeOrder();
  }

  initializeOrder() {
    this.recipes.forEach(recipe => 
      {
        this.order[recipe.id] = {quantity: 0, time: null};
      });
  }

  increase(recipe: Recipe) {
    this.order[recipe.id].quantity++;
  }

  decrease(recipe: Recipe) {
    if (this.order[recipe.id].quantity > 0) {
      this.order[recipe.id].quantity--;
    }
  }

  createRecipe() {
    this.dialogService.createRecipe(this.ingredients, this.viewContainerRef).subscribe(
      value => {
        if (!value || !value.name || !value.price || !value.quantity) {
          return;
        }
        const recipe: Recipe = {
          id: uuidV4(),
          name: value.name,
          price: value.price,
          img: '',
          ingredients: value.quantity
        }
        this.create.emit(recipe);
      }
    );
  }

  cancelOrder() {
    this.cancel.emit();
  }

  confirmDisabled() {
    return _.reduce(this.order, (result, value, key) => result + this.order[key].quantity, 0) === 0;
  }

  confirmOrder() {
    const orderedRecipes = this.recipes.filter(recipe => this.order[recipe.id]);
    let orderedIng: IngredientQuantity = {};
    orderedRecipes.forEach(recipe => {
      _.forEach(recipe.ingredients, (value, key) => {
        orderedIng[key] = +(orderedIng[key] || 0) + value * this.order[recipe.id].quantity;
      });
    });

    let overUsed: Ingredient[] = [];
    _.forEach(orderedIng, (value, key) => {
      if (this.ingredientQuantity[key] < value) {
        overUsed.push(this.ingredients.find(ing => ing.id === key));
      }
    });
    if (overUsed.length === 0) {
      const messages = orderedRecipes
        .filter(recipe => this.order[recipe.id].quantity > 0)
        .map(recipe => recipe.name + ' x ' + this.order[recipe.id].quantity);
      this.dialogService.confirm(
        "Confirm Order",
        messages,
        this.viewContainerRef).subscribe(
          res => {
            if (res) {
              _.forEach(this.order, value => {
                value.time = new Date();
              });
              this.confirm.emit(_.cloneDeep(this.order));
              // emit ingredient quantity
              this.decreaseIngredient.emit(orderedIng);

              this.initializeOrder();
            }
          }
      );
    } else {
      const messages = overUsed.map(ing => ing.name + ' is not enough!');
      this.dialogService.confirm(
        "Not Enough Ingredients",
        messages,
        this.viewContainerRef).subscribe(
          () => {}
      );
    }
  }

  pay() {
    let canPay = true;
    _.forEach(this.ordered, (value, recipeId) => {
      if (value.quantity !== this.served[recipeId].quantity) {
        canPay = false;
      }
    });
    if (!canPay) {
      this.dialogService.confirm(
        "Confirm Payment",
        [
          "Not all recipes are served yet",
          "Do you really want to pay the bill?"
        ],
        this.viewContainerRef
      ).subscribe(
        res => {
          if (res) {
            this.confirmPay();
          }
        }
      );
    } else {
      this.confirmPay();
    }
  }

  confirmPay() {
    this.paybill.emit({
      tableName: this.tables.find(table => table.id === this.tableId).name,
      bill: this.bill
    });
  }

}
