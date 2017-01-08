import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.container';
import { TablesModule } from './tables/tables.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TablesModule,
    LayoutModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
