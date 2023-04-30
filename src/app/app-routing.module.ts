import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModalWindowComponent } from './core/components/main-modal-window/main-modal-window.component';
import { CartComponent } from './shopping-cart/components/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainModalWindowComponent },
  { path: 'shopping-cart', component: CartComponent },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule)
  },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
