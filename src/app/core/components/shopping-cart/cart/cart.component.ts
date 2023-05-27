import { Store } from '@ngrx/store';
import { appSettingsActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Component, OnInit } from '@angular/core';
import { CurrentOrder, UserOrder } from 'src/app/shared/interfaces/interfaces';
import { selectOrders } from 'src/app/redux/selectors/orders.selectors';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { selectSettingsState } from 'src/app/redux/selectors/app.selectors';
import { CurrencyService } from 'src/app/shared/services/currency.service';

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
  public totalCostForDisplay!: number;

  constructor(
    private store: Store,
    private currencyService: CurrencyService,
  ) {
    this.store.select(selectOrders).pipe(takeUntil(this.destroy$)).subscribe(
      (orders) => {
        this.orders = orders;
      },
    );
    this.store.select(selectSettingsState).pipe(takeUntil(this.destroy$)).subscribe(
      (settings) => {
        this.currency = settings.currency;
        console.log(this.currency)
        this.totalCostForDisplay = this.currencyService.calculateCurrencyValue(this.totalCost, this.currency);
      }
    )
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
    this.totalCostForDisplay = this.currencyService.calculateCurrencyValue(this.totalCost, this.currency);
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

  onChangeOrderPayable(ordersPayable: UserOrder[]) {
    this.ordersPayable = ordersPayable;
    this.totalCostForDisplay = this.currencyService.calculateCurrencyValue(this.totalCost, this.currency);
  }
}
