import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { AuthWindowComponent } from 'src/app/auth/pages/auth-window/auth-window.component';

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

  constructor(private authService: AuthService, private dialog: MatDialog,) { }

  toggleAuthWindow() {
    this.dialog.open(AuthWindowComponent, { disableClose: true })
  }
}
