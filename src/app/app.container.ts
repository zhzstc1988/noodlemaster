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
          icon="event_seat"
          hint="Take seat"
        >
          Tables
        </nm-nav-item>
        <nm-nav-item
          (activate)="closeSidenav()"
          routerLink="/menu"
          icon="restaurant_menu"
          hint="Check Menu"
        >
          Menu
        </nm-nav-item>
        <nm-nav-item
          (activate)="closeSidenav()"
          routerLink="/payments"
          icon="payment"
          hint="Check Payments"
        >
          Payments
        </nm-nav-item>
        <nm-nav-item
          (activate)="closeSidenav()"
          routerLink="/ingredients"
          icon="shopping_cart"
          hint="Check Ingredients"
        >
          Ingredients
        </nm-nav-item>
      </nm-sidenav>
      <nm-toolbar (openMenu)="openSidenav()">
        Noodle Master
      </nm-toolbar>

      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </nm-layout>
  `,
  styles: [`
    md-sidenav-layout {
      background: rgba(0, 0, 0, 0.03);
    }

    .main-content {
      padding-left: 16px;
      padding-right: 16px;
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
