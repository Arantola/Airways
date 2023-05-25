import { Store } from '@ngrx/store';
import { appSettingsActions, bookingActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Component, Input, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';
import { CurrentOrder, PassengersCompound, UserOrder } from 'src/app/shared/interfaces/interfaces';
import { selectOrders } from 'src/app/redux/selectors/orders.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BOOKING_PAGES, CART_COLUMNS } from 'src/app/shared/constants/constants';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PeriodicElement {
  no: string | undefined;
  flight: string;
  typeTrip: string;
  dataTime: string[];
  passengers: PassengersCompound;
  price: number | undefined;
  id: string;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements AfterViewInit{
  @Input() public sum?: number;

  public currency = 'EUR';

  public allOrdersSelected = false;

  private orders?: UserOrder[];

  private ordersPayable: UserOrder[] = [];

  private destroy$ = new Subject();

  public dataSource = new MatTableDataSource<UserOrder>();

  @ViewChild(MatSort)
  sort?: MatSort;

  constructor(
    private store: Store,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'cart' }));
    this.store.dispatch(ordersActions.loadOrders());
    this.store.select(selectOrders).pipe(takeUntil(this.destroy$)).subscribe((orders) => {
      this.orders = orders;
      this.dataSource.data = orders;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private transformDateFormat(date: string | undefined) {
    if (date === undefined) {
      return;
    }
    const newDate = formatDate(date, 'd, MMM, YYYY', 'en')
    return newDate;
  }

  public deleteOrder(id: string) {
    this.store.dispatch(ordersActions.deleteOrder({ id }));
  }

  public editOrder(id: string) {
    const userOrder = this.orders?.find((userOrder) => Object.keys(userOrder)[0] === id);
    if (userOrder === undefined) {
      return;
    }
    const currentOrder = this.getElementData(userOrder);
    this.store.dispatch(bookingActions.updateFirstForm({ currentOrder }))
    this.router.navigate(['/main', BOOKING_PAGES[0]])
  }

  public onAllOrdersSelected(event: MatCheckboxChange): void {
    if (event.checked) {
      this.ordersPayable = this.orders?.slice(0) ?? [];
    } else {
      this.ordersPayable = [];
    }
    
    console.log('ordersPayable', this.ordersPayable);
  }

  public isAllOrdersSelected(): boolean {
    return this.orders?.length === this.ordersPayable.length;
  }

  public addOrderToPayment(no: string) {
    //берем все заказы и ищем по номеру, после добавляем в массив
    //если ordersPayable === orders, то allOrdersSelected === true
  }

  public orderSelected(event: MatCheckboxChange, userOrder: UserOrder) {
    if (event.checked) {
      this.ordersPayable.push(userOrder);
    } else {
      const index = this.ordersPayable.indexOf(userOrder);
      this.ordersPayable.splice(index, 1);
    }

    console.log('ordersPayable', this.ordersPayable);
  }

  public get displayedColumns(): string[] { 
    let columns = CART_COLUMNS;

    columns = [
      'checkbox',
      ...columns,
      'menu',
    ]

    return columns;
  }

  ngAfterViewInit() {
    if (this.sort !== undefined) {
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isOrderSelected(userOrder: UserOrder): boolean {
    return this.ordersPayable.indexOf(userOrder) >= 0;
  }

  getElementId(userOrder: UserOrder): string {
    return Object.keys(userOrder)[0];
  }

  getElementData(userOrder: UserOrder): CurrentOrder {
    const id = this.getElementId(userOrder);
    return userOrder[id];
  }

  getElementNo(userOrder: UserOrder): string | undefined {
    const order = this.getElementData(userOrder);
    return order.selectedFlightFrom?.flight?.id;
  }

  getElementFlight(userOrder: UserOrder): string | undefined {
    const order = this.getElementData(userOrder);

    if (
      order.destinationPoint === undefined ||
      order.departurePoint === undefined
    ) {
      return;
    }

    let wallBack = '';
    if (order.isRounded) {
      wallBack = ` — ${order.departurePoint.city}`;
    }

    return `${order.departurePoint.city} — ${order.destinationPoint.city}${wallBack}`;
  }

  getElementTypeTrip(userOrder: UserOrder): string {
    const order = this.getElementData(userOrder);

    return order.isRounded ? 'Round trip' : 'One way';
  }

  getElementDates(userOrder: UserOrder): string[] {
    const order = this.getElementData(userOrder);

    const dates = [
      `${this.transformDateFormat(order.selectedFlightFrom?.flight?.date)},
        ${order.selectedFlightFrom?.flight?.startTime} —
        ${order.selectedFlightFrom?.finishTime}`,
    ];

    if (order.isRounded) {
      dates.push(`${this.transformDateFormat(order.selectedFlightBack?.flight?.date)},
        ${order.selectedFlightBack?.flight?.startTime} —
        ${order.selectedFlightBack?.finishTime}`);
    }

    return dates;
  }

  getElementPassengers(userOrder: UserOrder): PassengersCompound {
    const order = this.getElementData(userOrder);

    return order.passengersCompound;
  }

  getElementPrice(userOrder: UserOrder): number | undefined {
    const order = this.getElementData(userOrder);

    return order.totalCost;
  }

  get totalCost(): number {
    return this.ordersPayable
      .map((order) => this.getElementData(order).totalCost)
      .reduce((total, cost) => total + cost, 0);
  }
}
