import { MdDialogRef } from '@angular/material';
import { Ingredient, IngredientQuantity } from './../models/ingredient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nm-create-recipe-dialog',
  template: `
    <h2>Create Recipe</h2>
    <md-input-container>
      <input md-input placeholder="name" [(ngModel)]="name">
    </md-input-container>
    <md-input-container>
      <input md-input placeholder="price" [(ngModel)]="price">
    </md-input-container>
    <h3>Needed Ingredients</h3>
    <md-input-container *ngFor="let ingredient of ingredients">
      <input md-input [placeholder]="ingredient.name" [(ngModel)]="quantity[ingredient.id]">
    </md-input-container>
    <button type="button" md-raised-button 
        (click)="dialogRef.close({name: name, price: price, quantity: quantity})">OK</button>
    <button type="button" md-button
        (click)="dialogRef.close()">Cancel</button>
  `,
  styles: []
})
export class CreateRecipeDialog implements OnInit {

  name: string;
  price: number;
  quantity: IngredientQuantity;
  
  public ingredients: Ingredient[];

  constructor(public dialogRef: MdDialogRef<CreateRecipeDialog>) {
    //this.ingredients.forEach(ing => this.quantity[ing.id] = 0);
    this.quantity = {};
  }

  ngOnInit() {
  }

}
