import { selectCurrentOrder, selectCurrentPage } from './../../../redux/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';
import { SummaryModalWindowComponent } from '../../components/summary-modal-window/summary-modal-window.component';
import { UserOrdersService } from 'src/app/shared/services/user-orders.service';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import { appSettingsActions, bookingActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { take } from 'rxjs';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  currentOrder!: CurrentOrder;

  public fromUserAccount?: boolean;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private ordersService: UserOrdersService
  ) {
    this.store.select(selectCurrentPage).pipe(take(1)).subscribe((page) => {
      this.fromUserAccount = page === 'account'
    })
    this.store.select(selectCurrentOrder).pipe(take(2)).subscribe((order) => {
      this.currentOrder = order;
    });
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
