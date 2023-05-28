import { Pipe, PipeTransform } from '@angular/core';
import { CURRENCIES, CurrencySymbols } from 'src/app/shared/constants/constants';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(currency: string, ...args: unknown[]): string {
    switch(currency) {
      case CURRENCIES[0]:
        return CurrencySymbols.EUR;

      case CURRENCIES[1]:
        return CurrencySymbols.USA;

      case CURRENCIES[2]:
        return CurrencySymbols.RUB;

      case CURRENCIES[3]:
        return CurrencySymbols.PLN;

      default:
        return '';
    }
  }

}
