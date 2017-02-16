import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Recipe, Order } from './../models/menu';

@Component({
  selector: 'nm-menu-list',
  templateUrl: './menu-list.component.html',
  styles: []
})
export class MenuListComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Input() order: Order;
  @Input() bill: number;
  @Output() increaseRecipe = new EventEmitter<Recipe>();
  @Output() decreaseRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  increase(recipe: Recipe) {
    this.increaseRecipe.emit(recipe);
  }

  decrease(recipe: Recipe) {
    this.decreaseRecipe.emit(recipe);
  }

}
