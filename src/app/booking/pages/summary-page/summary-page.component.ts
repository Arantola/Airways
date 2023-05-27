import { selectCurrentOrder, selectCurrentPage } from './../../../redux/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';
import { SummaryModalWindowComponent } from '../../components/summary-modal-window/summary-modal-window.component';
import { UserOrdersService } from 'src/app/shared/services/user-orders.service';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import { appSettingsActions, bookingActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Subscription, take } from 'rxjs';

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
    private ordersService: UserOrdersService
  ) {
    this.store.select(selectCurrentPage).pipe(take(1)).subscribe((page) => {
      this.fromUserAccount = page === 'account'
    })
    this.selectCurrentOrderSubscription = this.store.select(selectCurrentOrder)
      .subscribe((order) => {
        this.currentOrder = order;
      });
  }
  ngOnDestroy(): void {
    this.selectCurrentOrderSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[2] })
    );
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
    console.log('addToCart', this.currentOrder) //total cost === 0
    this.store.dispatch(ordersActions.saveOrder({order: this.currentOrder}));
    this.dialog.open(SummaryModalWindowComponent, {
      data: {
        type: 'cart',
      },
    });
  }

  payOrder() {
    this.ordersService.getAllOrders();
    console.log(this.ordersService.userOrders);
    this.dialog.open(SummaryModalWindowComponent, {
      data: {
        type: 'booking',
      },
    });
  }
}
