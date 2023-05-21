import { selectCurrentOrder } from './../../../redux/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';
import { SummaryModalWindowComponent } from '../../components/summary-modal-window/summary-modal-window.component';
import { UserOrdersService } from 'src/app/shared/services/user-orders.service';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  currentOrder!: CurrentOrder;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private ordersService: UserOrdersService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[2] })
    );
    this.store.select(selectCurrentOrder).subscribe((order) => {
      this.currentOrder = order;
    });
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
    this.ordersService.saveNewOrder(this.currentOrder);
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
