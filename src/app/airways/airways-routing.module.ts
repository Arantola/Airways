import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { BookingProcessPageComponent } from './pages/booking-process-page/booking-process-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';

const routes: Routes = [
  {
    path: 'flight-selection',
    component: FlightSelectionPageComponent,
  },
  {
    path: 'booking-process',
    component: BookingProcessPageComponent,
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
export class AirwaysRoutingModule { }