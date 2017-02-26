import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nm-change-ingredient-dialog',
  template: `
    <h2>{{ title }}</h2>
    <md-input-container *ngIf="title === 'Create new Ingredient'">
      <input md-input placeholder="name" [(ngModel)]="name">
    </md-input-container>
    <md-input-container>
      <input md-input placeholder="price" [(ngModel)]="price">
    </md-input-container>
    <md-input-container>
      <input md-input placeholder="quantity" [(ngModel)]="quantity">
    </md-input-container>
    <button type="button" md-raised-button 
        (click)="dialogRef.close({name: name, price: price, quantity: quantity})">OK</button>
    <button type="button" md-button
        (click)="dialogRef.close()">Cancel</button>
  `,
  styles: []
})
export class ChangeIngredientDialog implements OnInit {

  public title: string;
  public name: string;
  public price: number;
  public quantity: number;

  constructor(public dialogRef: MdDialogRef<ChangeIngredientDialog>) { }

  ngOnInit() {
  }

}
