import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule' },
  { path: 'ingredients', loadChildren: 'app/ingredients/ingredients.module#IngredientsModule' },
  { path: 'payments', loadChildren: 'app/payment/payment.module#PaymentModule' },
  { path: 'menu', loadChildren: 'app/menu/menu.module#MenuModule' },
  { path: '', redirectTo: '/tables', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }