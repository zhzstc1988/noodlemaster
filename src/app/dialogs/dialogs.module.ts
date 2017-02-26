import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { DialogsService } from './dialogs.service';
import { ConfirmDialog } from './confirm-dialog.component';
import { AddTableDialog } from './add-table-dialog.component';
import { ChangeIngredientDialog } from './change-ingredient-dialog.component';
import { CreateRecipeDialog } from './create-recipe-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    ConfirmDialog,
    AddTableDialog,
    ChangeIngredientDialog,
    CreateRecipeDialog
  ],
  providers: [
    DialogsService
  ],
  exports: [
    ConfirmDialog,
    AddTableDialog,
    ChangeIngredientDialog,
    CreateRecipeDialog
  ],
  entryComponents: [
    ConfirmDialog,
    AddTableDialog,
    ChangeIngredientDialog,
    CreateRecipeDialog
  ]
})
export class DialogsModule { }