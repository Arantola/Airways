import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { PageContainerComponent } from './pages/page-container/page-container.component';
import { AppRoutingModule } from '../app-routing.module';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AirwaysModule } from '../airways/airways.module';
import { BookingModule } from '../booking/booking.module';


const CoreComponents = [
  HeaderComponent,
  StepperComponent,
  PageContainerComponent,
  SecondMenuComponent,
  FooterComponent,
];

@NgModule({
  declarations: [CoreComponents],
  exports: [CoreComponents],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AirwaysModule,
    BookingModule,
  ],
})
export class CoreModule {}
