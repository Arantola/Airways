import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainModalWindowComponent } from './pages/main-page/main-modal-window.component';

const BookingComponents = [MainModalWindowComponent];

@NgModule({
  declarations: [BookingComponents],
  exports: [BookingComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class AirwaysModule {}
