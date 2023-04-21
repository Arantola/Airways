import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModalWindowComponent } from './core/components/main-modal-window/main-modal-window.component';
import { PassengersPageComponent } from './booking/pages/passengers-page/passengers-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainModalWindowComponent },
  { path: 'passengers', component: PassengersPageComponent },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
