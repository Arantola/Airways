import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModalWindowComponent } from './airways/pages/main-page/main-modal-window.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainModalWindowComponent },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
