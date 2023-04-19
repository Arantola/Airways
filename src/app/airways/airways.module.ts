import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { AirwaysRoutingModule } from './airways-routing.module';
import { BookingProcessPageComponent } from './pages/booking-process-page/booking-process-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';

@NgModule({
  declarations: [
    FlightSelectionPageComponent,
    BookingProcessPageComponent,
    SummaryPageComponent
  ],
  imports: [
    CommonModule,
    AirwaysRoutingModule,
  ]
})
export class AirwaysModule { }
