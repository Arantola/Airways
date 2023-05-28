import {
  selectCurrentOrder,
  selectCurrentPage,
} from './../../../redux/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';
import { SummaryModalWindowComponent } from '../../components/summary-modal-window/summary-modal-window.component';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import {
  appSettingsActions,
  bookingActions,
  ordersActions,
} from 'src/app/redux/actions/app.actions';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  currentOrder!: CurrentOrder;

  public fromUserAccount?: boolean;

  private selectCurrentOrderSubscription: Subscription;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.store
      .select(selectCurrentPage)
      .pipe(take(1))
      .subscribe((page) => {
        this.fromUserAccount = page === 'account';
      });
    this.selectCurrentOrderSubscription = this.store
      .select(selectCurrentOrder)
      .subscribe((order) => {
        this.currentOrder = order;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[2] })
    );
  }

  ngOnDestroy(): void {
    this.selectCurrentOrderSubscription.unsubscribe();
  }

  get isRoundTrip() {
    return this.currentOrder.isRounded;
  }

  get flightFrom() {
    return this.currentOrder.selectedFlightFrom!;
  }

  get flightBack() {
    return this.currentOrder.selectedFlightBack!;
  }

  addToCart() {
    this.store.dispatch(ordersActions.saveOrder({ order: this.currentOrder }));
    this.dialog.open(SummaryModalWindowComponent, {
      data: {
        type: 'cart',
      },
    });
    setTimeout(() => {
      this.store.dispatch(bookingActions.resetOrder({ currentOrder: {} }));
      this.dialog.closeAll();
      this.router.navigate(['/cart']);
    }, 2000);
  }

  payOrder() {
    this.store.dispatch(
      ordersActions.saveOrder({
        order: {
          ...this.currentOrder,
          paid: true,
        },
      })
    );
    this.dialog.open(SummaryModalWindowComponent, {
      data: {
        type: 'booking',
      },
    });
    setTimeout(() => {
      this.store.dispatch(bookingActions.resetOrder({ currentOrder: {} }));
      this.dialog.closeAll();
      this.router.navigate(['/account']);
    }, 2000);
  }
}
