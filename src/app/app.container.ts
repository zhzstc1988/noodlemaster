import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from './reducers';
import * as layoutAction from './actions/layout.action';

@Component({
  selector: 'nm-root',
  template: `
    <nm-layout>
      <nm-sidenav [open]="showSidenav$ | async" (close)="closeSidenav()">
        <nm-nav-item
          (activate)="closeSidenav()"
          routerLink="/"
          icon="book"
          hint="View your book collection"
        >
          My Collection
        </nm-nav-item>
        <nm-nav-item
          (activate)="closeSidenav()"
          routerLink="/tables"
          icon="search"
          hint="Find your next book!"
        >
          Browse Books
        </nm-nav-item>
      </nm-sidenav>
      <nm-toolbar (openMenu)="openSidenav()">
        Noodle Master
      </nm-toolbar>

      <router-outlet></router-outlet>
    </nm-layout>
  `,
  styles: [`
    md-sidenav-layout {
      background: rgba(0, 0, 0, 0.03);
    }
    
    *, /deep/ * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `]
})
export class AppComponent implements OnInit {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = store.select(fromRoot.getShowSidenav);
  }

  ngOnInit() {

  }

  openSidenav() {
    this.store.dispatch(new layoutAction.OpenSidenavAction());
  }

  closeSidenav() {
    this.store.dispatch(new layoutAction.CloseSidenavAction());
  }
}
