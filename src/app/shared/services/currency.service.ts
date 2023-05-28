import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EXCHANGE_RATE } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencyRate = {
    EURtoUSD: 1,
    EURtoRUB: 1,
    EURtoPLN: 1,
  };

  constructor(private http: HttpClient) {}

  saveCurrencyData() {
    this.getCurrencyData().subscribe({
      next: (data: any) => {
        this.currencyRate = {
          EURtoUSD: data.Valute.EUR.Value / data.Valute.USD.Value,
          EURtoRUB: data.Valute.EUR.Value,
          EURtoPLN: data.Valute.EUR.Value / data.Valute.PLN.Value,
        };
      },
    });
  }

  getCurrencyData() {
    return this.http.get(EXCHANGE_RATE);
  }

  calculateCurrencyValue(moneyValue: number, nameCurrency: string): number {
    switch (nameCurrency) {
      case 'USA':
        return moneyValue * this.currencyRate.EURtoUSD;
      case 'RUB':
        return moneyValue * this.currencyRate.EURtoRUB;
      case 'PLN':
        return moneyValue * this.currencyRate.EURtoPLN;
      default:
        return moneyValue;
    }
  }
}
