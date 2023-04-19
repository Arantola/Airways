import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';

const MaterialModules = [
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
  MatRadioModule,
  MatDatepickerModule,
  NativeDateModule,
  MatNativeDateModule,
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class MaterialModule {}
