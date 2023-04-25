import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';

const BookingComponents = [PassengersPageComponent, PassengerListComponent];

@NgModule({
  declarations: [BookingComponents],
  exports: [BookingComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class BookingModule {}
