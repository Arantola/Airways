import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { AirwaysRoutingModule } from './airways-routing.module';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';

@NgModule({
  declarations: [
    FlightSelectionPageComponent,
    SummaryPageComponent,
    PassengersPageComponent
  ],
  imports: [
    CommonModule,
    AirwaysRoutingModule,
  ]
})
export class AirwaysModule { }
