import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySymbolPipe } from './pipes/currency-symbol.pipe';
import { AirportAntiDuplicationPipe } from './pipes/airport-anti-duplication.pipe';

@NgModule({
  declarations: [CurrencySymbolPipe, AirportAntiDuplicationPipe],
  imports: [CommonModule],
  exports: [CurrencySymbolPipe, AirportAntiDuplicationPipe],
})
export class SharedModule {}
