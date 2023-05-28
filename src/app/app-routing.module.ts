import { ErrorComponent } from './core/components/error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModalWindowComponent } from './core/components/main-modal-window/main-modal-window.component';
import { CartComponent } from './core/components/shopping-cart/cart/cart.component';
import { UserAccountComponent } from './core/components/user-account/user-account.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'main', component: MainModalWindowComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'shopping-cart', canActivate: [AuthGuard], component: CartComponent },
  {
    path: 'account',
    canActivate: [AuthGuard],
    component: UserAccountComponent,
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
