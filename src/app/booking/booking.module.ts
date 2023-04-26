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

const BookingComponents = [
  PassengersPageComponent,
  PassengerListComponent,
  FlightSelectionPageComponent,
  SummaryPageComponent,
  PassengersPageComponent,
  DateCardComponent,
  DateCarouselComponent,
];

@NgModule({
  declarations: [BookingComponents, IndicatorColorDirective],
  exports: [BookingComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, BookingRoutingModule],
})
export class BookingModule {}
