import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'nm-confirm-dialog',
  template: `
    <h2>{{ title }}</h2>
    <p *ngFor="let message of messages">{{ message }}</p>
    <button type="button" md-raised-button 
        (click)="dialogRef.close(true)">OK</button>
    <button type="button" md-button 
        (click)="dialogRef.close()">Cancel</button>
  `,
  styles: []
})
export class ConfirmDialog implements OnInit {

  public title: string;
  public messages: string[];

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) { }

  ngOnInit() {
  }

}
