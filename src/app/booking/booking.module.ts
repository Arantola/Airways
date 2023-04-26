import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { BookingRoutingModule } from './booking-routing.module';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { DateCardComponent } from './components/date-card/date-card.component';
import { DateCarouselComponent } from './components/date-carousel/date-carousel.component';
import { IndicatorColorDirective } from './directives/indicator-color.directive';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { FlightFareComponent } from './components/flight-fare/flight-fare.component';
import { FlightDirectionComponent } from './components/flight-info/flight-direction/flight-direction.component';
import { PassengerInfoComponent } from './components/flight-info/passenger-info/passenger-info.component';

const BookingComponents = [];

@NgModule({
  declarations: [
    FlightSelectionPageComponent,
    SummaryPageComponent,
    PassengersPageComponent,
    DateCardComponent,
    DateCarouselComponent,
    IndicatorColorDirective,
    FlightInfoComponent,
    FlightFareComponent,
    FlightDirectionComponent,
    PassengerInfoComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BookingRoutingModule,
  ],
})
export class BookingModule {}
