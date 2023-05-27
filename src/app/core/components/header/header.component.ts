import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthWindowComponent } from 'src/app/auth/pages/auth-window/auth-window.component';
import { BOOKING_PAGES, CURRENCIES, DATE_FORMATS } from 'src/app/shared/constants/constants';
import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
import {
  selectCurrentPage,
  selectUserName,
} from 'src/app/redux/selectors/app.selectors';
import { IconService } from 'src/app/shared/services/icon.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private subscriptionUserName!: Subscription;

  public readonly dateFormats = DATE_FORMATS;
  public readonly currencies = CURRENCIES;

  public selectedDateFormat = this.dateFormats[0];
  public selectedCurrency = this.currencies[0];
  public userName = '';

  public currentPage = 'main';

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private iconService: IconService,
    private currencyService: CurrencyService,
  ) {
    this.iconService.addPath('user', 'assets/icons/user.svg');
    this.iconService.addPath('basket', 'assets/icons/shopping_basket.svg');
  }

  ngOnInit() {
    this.trackPage();
    this.subscribeToUserName();
    this.currencyService.saveCurrencyData();
  }

  ngOnDestroy(): void {
    this.subscriptionUserName.unsubscribe();
  }

  private subscribeToUserName() {
    this.subscriptionUserName = this.store
      .select(selectUserName)
      .subscribe((userName) => {
        this.userName = userName;
      });
  }

  private trackPage() {
    this.store.select(selectCurrentPage).subscribe((currentPage) => {
      this.currentPage = currentPage;
    });
  }

  get isBookingPage() {
    return BOOKING_PAGES.includes(this.currentPage);
  }

  get isMainPage() {
    return this.currentPage === 'main';
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
