import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nm-toolbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="openMenu.emit()">
        <md-icon>menu</md-icon>
      </button>
      <ng-content></ng-content>
    </md-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {
  @Output() openMenu = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
