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
import { BookingModule } from '../booking/booking.module';
import { MainModalWindowComponent } from './components/main-modal-window/main-modal-window.component';
import { AuthModule } from '../auth/auth.module';
import { ErrorComponent } from './components/error/error.component';

const CoreComponents = [
  HeaderComponent,
  StepperComponent,
  PageContainerComponent,
  SecondMenuComponent,
  MainModalWindowComponent,
  FooterComponent,
];

@NgModule({
  declarations: [CoreComponents, ErrorComponent],
  exports: [CoreComponents],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BookingModule,
    AuthModule,
  ],
})
export class CoreModule {}
