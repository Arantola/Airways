import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModalWindowComponent } from './core/components/main-modal-window/main-modal-window.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainModalWindowComponent },
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
