import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { BOOKING_PAGES } from '../shared/constants/constants';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: BOOKING_PAGES[0],
    component: FlightSelectionPageComponent,
  },
  {
    path: BOOKING_PAGES[1],
    component: PassengersPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: BOOKING_PAGES[2],
    component: SummaryPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
