import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nm-add-table-dialog',
  template: `
    <h2>Add Table</h2>
    <md-input-container>
      <input md-input placeholder="number of seats" [(ngModel)]="nrofSeats">
    </md-input-container>
    <md-input-container>
      <input md-input placeholder="name" [(ngModel)]="name">
    </md-input-container>
    <button type="button" md-raised-button 
        (click)="dialogRef.close({nrofSeats: nrofSeats, name: name})">OK</button>
    <button type="button" md-button
        (click)="dialogRef.close()">Cancel</button>
  `,
  styles: []
})
export class AddTableDialog implements OnInit {

  public nrofSeats: number;
  public name: string;

  constructor(public dialogRef: MdDialogRef<AddTableDialog>) { }

  ngOnInit() {
  }

}
