import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('app-header');
  }
}
