import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';

const routes: Routes = [
  {
    path: 'flight-selection',
    component: FlightSelectionPageComponent,
  },
  {
    path: 'passengers',
    component: PassengersPageComponent,
  },
  {
    path: 'summary',
    component: SummaryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule { }