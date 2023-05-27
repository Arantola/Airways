import { Store } from '@ngrx/store';
import { appSettingsActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CurrentOrder, UserOrder } from 'src/app/shared/interfaces/interfaces';
import { selectOrders } from 'src/app/redux/selectors/orders.selectors';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalWindowComponent } from '../payment-modal-window/payment-modal-window.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public currency = 'EUR';
  public allOrdersSelected = false;
  public orders?: UserOrder[];
  public ordersPayable: UserOrder[] = [];
  public dataSource = new MatTableDataSource<UserOrder>();

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) {
    this.store.select(selectOrders).pipe(takeUntil(this.destroy$)).subscribe(
      (orders) => {
        this.orders = orders;
      },
    );
  }

  ngOnInit(): void {
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'shopping-cart' }));
    this.store.dispatch(ordersActions.loadOrders());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAllOrdersSelected(event: MatCheckboxChange): void {
    if (event.checked) {
      this.ordersPayable = this.orders?.slice(0) ?? [];
    } else {
      this.ordersPayable = [];
    }
  }

  public isAllOrdersSelected(): boolean {
    return this.orders?.length === this.ordersPayable.length;
  }

  getElementId(userOrder: UserOrder): string {
    return Object.keys(userOrder)[0];
  }

  getElementData(userOrder: UserOrder): CurrentOrder {
    const id = this.getElementId(userOrder);
    return userOrder[id];
  }

  get totalCost(): number {
    return this.ordersPayable
      .map((order) => this.getElementData(order).totalCost)
      .reduce((total, cost) => total + cost, 0);
  }

  openDialog() {
    this.dialog.open(PaymentModalWindowComponent);

    this.ordersPayable.forEach((userOrder) => {
      const key = this.getElementId(userOrder);
      const order = this.getElementData(userOrder);
      userOrder = {
        [key]: {
          ...order,
          paid: true,
        }
      }
      this.store.dispatch(ordersActions.updateOrder({userOrder}));
    })
    console.log(this.ordersPayable)
  }
}
