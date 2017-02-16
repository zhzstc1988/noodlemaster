import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nm-sidenav',
  template: `
    <md-sidenav [opened]="open">
      <md-nav-list>
        <ng-content></ng-content>
      </md-nav-list>
      <hr>
      <md-card>
        <button md-raised-button color="primary" (click)="close.emit()">
          Close
        </button>
      </md-card>
    </md-sidenav>
  `,
  styles: [`
    md-sidenav {
      width: 200px;
    }
    md-card {
      display: flex;
      padding: 12px;
      justify-content: center;
    }
  `]
})
export class SidenavComponent implements OnInit {
  @Input() open = false;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
