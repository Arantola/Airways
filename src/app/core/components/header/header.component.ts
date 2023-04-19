import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly dateFormats = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY/DD/MM',
    'YYYY/MM/DD',
  ];

  public readonly currencies = [
    'EUR',
    'USA',
    'RUB',
    'PLN',
  ]

  public selectedDateFormat = this.dateFormats[0];

  public selectedCurrency = this.currencies[0];

  public isBookingPage = true;

  constructor() { }
}
