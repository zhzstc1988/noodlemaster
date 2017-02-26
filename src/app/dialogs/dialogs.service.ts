import { CreateRecipeDialog } from './create-recipe-dialog.component';
import { Ingredient, IngredientQuantity } from './../models/ingredient';
import { ChangeIngredientDialog } from './change-ingredient-dialog.component';
import { AddTableDialog } from './add-table-dialog.component';
import { ConfirmDialog } from './confirm-dialog.component';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog) { }

  public confirm(
    title: string,
    messages: string[],
    viewContainerRef: ViewContainerRef): Observable<boolean> {
      let dialogRef: MdDialogRef<ConfirmDialog>;
      let config = new MdDialogConfig();
      config.viewContainerRef = viewContainerRef;

      dialogRef = this.dialog.open(ConfirmDialog, config);
      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.messages = messages;
      return dialogRef.afterClosed();
  }

  public addTable(
    viewContainerRef: ViewContainerRef): Observable<number> {
      let dialogRef: MdDialogRef<AddTableDialog>;
      let config = new MdDialogConfig();
      config.viewContainerRef = viewContainerRef;

      dialogRef = this.dialog.open(AddTableDialog, config);
      return dialogRef.afterClosed();
  }

  public changeIngredientQuantity(
    title: string,
    viewContainerRef: ViewContainerRef): Observable<{price: number, quantity: number}> {
      let dialogRef: MdDialogRef<ChangeIngredientDialog>;
      let config = new MdDialogConfig();
      config.viewContainerRef = viewContainerRef;

      dialogRef = this.dialog.open(ChangeIngredientDialog, config);
      dialogRef.componentInstance.title = title;
      return dialogRef.afterClosed();
  }

  public createIngredientQuantity(
    viewContainerRef: ViewContainerRef): Observable<{name: string, price: number, quantity: number}> {
      let dialogRef: MdDialogRef<ChangeIngredientDialog>;
      let config = new MdDialogConfig();
      config.viewContainerRef = viewContainerRef;

      dialogRef = this.dialog.open(ChangeIngredientDialog, config);
      dialogRef.componentInstance.title = 'Create new Ingredient';
      return dialogRef.afterClosed();
  }

  public createRecipe(
    ingredients: Ingredient[],
    viewContainerRef: ViewContainerRef): Observable<{name: string, price: number, quantity: IngredientQuantity}> {
      let dialogRef: MdDialogRef<CreateRecipeDialog>;
      let config = new MdDialogConfig();
      config.viewContainerRef = viewContainerRef;

      dialogRef = this.dialog.open(CreateRecipeDialog, config);
      dialogRef.componentInstance.ingredients = ingredients;
      return dialogRef.afterClosed();
    }

}