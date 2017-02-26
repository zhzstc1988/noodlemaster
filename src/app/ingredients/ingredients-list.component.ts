import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { DialogsService } from './../dialogs/dialogs.service';
import { Ingredient, IngredientQuantity, IngredientInfo } from './../models/ingredient';
const uuidV4 = require('uuid/v4');

@Component({
  selector: 'nm-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styles: [`
    .fill-remaining-space {
      flex: 1 1 auto;
    }
  `]
})
export class IngredientsListComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  @Input() quantity: IngredientQuantity;
  @Output() ingredientCreated = new EventEmitter<Ingredient>();
  @Output() ingredientIncreased = new EventEmitter();
  //@Output() ingredientsDecreased = new EventEmitter();

  constructor(
    private dialogService: DialogsService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  createIngredient() {
    this.dialogService.createIngredientQuantity(this.viewContainerRef)
      .subscribe(
        value => {
          if (!!value) {
            const id = uuidV4();
            this.ingredientCreated.emit(new Ingredient(id, value.name));
            this.ingredientIncreased.emit(
              new IngredientInfo(id, value.name, value.price, value.quantity));
          }
        }
      );
  }

  increase(ingredient: Ingredient) {
    this.dialogService.changeIngredientQuantity(
      'Increase ' + ingredient.name,
      this.viewContainerRef
    ).subscribe(
      value => {
        if (!!value) {
          this.ingredientIncreased.emit(new IngredientInfo(
            ingredient.id,
            ingredient.name,
            value.price,
            value.quantity
          ));
        }
      }
    );
  }

}
