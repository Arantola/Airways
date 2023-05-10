import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthWindowComponent } from 'src/app/auth/pages/auth-window/auth-window.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { CURRENCIES, DATE_FORMATS } from 'src/app/shared/constants/constants';
import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
import { selectCurrentPage } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public readonly dateFormats = DATE_FORMATS;
  public readonly currencies = CURRENCIES;

  public selectedDateFormat = this.dateFormats[0];
  public selectedCurrency = this.currencies[0];

  public IsMainPage = true;

  constructor(
    private store: Store,
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

  ngOnInit() {
    this.trackPage();
  }

  private trackPage() {
    this.store.select(selectCurrentPage).subscribe((currentPage) => {
      this.IsMainPage = currentPage === 'main' || currentPage === 'admin';
    });
  }

  toggleAuthWindow() {
    this.dialog.open(AuthWindowComponent, { disableClose: true });
  }

  onChangeDateFormat(value: string) {
    this.selectedDateFormat = value;
    this.store.dispatch(
      appSettingsActions.changeDateFormat({ dateFormat: value })
    );
  }

  onChangeCurrency(value: string) {
    this.selectedCurrency = value;
    this.store.dispatch(appSettingsActions.changeCurrency({ currency: value }));
  }
}
