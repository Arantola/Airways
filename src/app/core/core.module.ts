import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { ContentContainerComponent } from './pages/content-container/content-container.component';
import { AppRoutingModule } from '../app-routing.module';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingModule } from '../booking/booking.module';

const CoreComponents = [
  HeaderComponent,
  StepperComponent,
  ContentContainerComponent,
  SecondMenuComponent,
  FooterComponent,
];

@NgModule({
  declarations: [CoreComponents],
  exports: [CoreComponents],
  imports: [CommonModule, AppRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule, BookingModule],
})
export class CoreModule {}
