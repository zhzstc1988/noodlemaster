import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SidenavComponent } from './sidenav.component';
import { NavItemComponent } from './nav-item.component';
import { ToolbarComponent } from './toolbar.component';

export const COMPONENTS = [
  LayoutComponent,
  SidenavComponent,
  ToolbarComponent,
  NavItemComponent
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class LayoutModule { }