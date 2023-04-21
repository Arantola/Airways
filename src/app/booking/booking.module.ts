import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { PhoneComponent } from './components/phone/phone.component';

const BookingComponents = [MainPageComponent, PassengersPageComponent, PassengerInfoComponent, PhoneComponent];

@NgModule({
  declarations: [BookingComponents],
  exports: [BookingComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class BookingModule {}
