import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AuthWindowComponent } from 'src/app/auth/pages/auth-window/auth-window.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

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

  public readonly currencies = ['EUR', 'USA', 'RUB', 'PLN'];

  public selectedDateFormat = this.dateFormats[0];

  public selectedCurrency = this.currencies[0];

  public isBookingPage = false;

  constructor(
    private dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/user.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'basket',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/shopping_basket.svg'
      )
    );
  }

  toggleAuthWindow() {
    this.dialog.open(AuthWindowComponent, { disableClose: true });
  }

  ngOnInit() {
    const pathname = window.location.pathname;
    const result = pathname.match(/^\/booking\//);
    if (result) {
      this.isBookingPage = true;
    }
  }
}
