import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const BookingComponents = [MainPageComponent];

@NgModule({
  declarations: [BookingComponents],
  exports: [BookingComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class BookingModule {}
