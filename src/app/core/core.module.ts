import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { ContentContainerComponent } from './pages/content-container/content-container.component';
import { AppRoutingModule } from '../app-routing.module';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { BookingModule } from '../booking/booking.module';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const CoreComponents = [
  HeaderComponent,
  ContentContainerComponent,
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
    BookingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
