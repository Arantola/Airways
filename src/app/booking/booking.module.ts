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
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { WayComponent } from './components/way/way.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { FlightFareComponent } from './components/flight-fare/flight-fare.component';
import { FlightDirectionComponent } from './components/flight-info/flight-direction/flight-direction.component';
import { PassengerInfoComponent } from './components/flight-info/passenger-info/passenger-info.component';
import { CurrencySymbolPipe } from './pipes/currency-symbol.pipe';

const BookingComponents = [
  PassengerListComponent,
  DateCardComponent,
  DateCarouselComponent,
  TicketComponent,
  WayComponent,
  FlightSelectionPageComponent,
  SummaryPageComponent,
  PassengersPageComponent,
  FlightInfoComponent,
  FlightFareComponent,
  FlightDirectionComponent,
  PassengerInfoComponent
];

@NgModule({
  declarations: [BookingComponents, IndicatorColorDirective, CurrencySymbolPipe],
  exports: [BookingComponents],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BookingRoutingModule,
  ],
})
export class BookingModule {}
