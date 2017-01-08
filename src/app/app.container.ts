import { Component } from '@angular/core';

@Component({
  selector: 'nm-root',
  template: `
    <nm-layout>
      <nm-sidenav [open]="false">
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
          routerLink="/book/find"
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
export class AppComponent {
  showSidenav

  openSidenav() {

  }
}
