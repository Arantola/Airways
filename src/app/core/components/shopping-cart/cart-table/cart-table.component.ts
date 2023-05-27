import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { BOOKING_PAGES, CART_COLUMNS } from 'src/app/shared/constants/constants';
import { Store } from '@ngrx/store';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { formatDate } from '@angular/common';
import { bookingActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { CurrentOrder, PassengersCompound, UserOrder } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements AfterViewInit {

  @Input() showControls = true;
  @Input() showLink = false;
  @Input() currency = 'EUR';
  @Input() orders?: UserOrder[];
  @Input() ordersPayable: UserOrder[] = [];

  @Output() changeOrdersPayable = new EventEmitter<UserOrder[]>();

  public allOrdersSelected = false;

  public dataSource = new MatTableDataSource<UserOrder>();

  @ViewChild(MatSort)
  sort?: MatSort;

  constructor(
    private store: Store,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { orders } = changes;
    if (orders !== undefined) {
      this.dataSource.data = orders.currentValue;
    }
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

  public orderSelected(event: MatCheckboxChange, userOrder: UserOrder) {
    if (event.checked) {
      this.ordersPayable.push(userOrder);
    } else {
      const index = this.ordersPayable.indexOf(userOrder);
      this.ordersPayable.splice(index, 1);
    }
    this.changeOrdersPayable.emit(this.ordersPayable);
  }

  isOrderSelected(userOrder: UserOrder): boolean {
    return this.ordersPayable.indexOf(userOrder) >= 0;
  }

  public get displayedColumns(): string[] {
    let columns = CART_COLUMNS;

    if(this.showLink) {
      columns = [
        ...columns,
        'link',
      ]
    }

    if (this.showControls) {
      columns = [
        'checkbox',
        ...columns,
        'menu',
      ]
    }

    return columns;

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

  goToSummary(userOrder: UserOrder) {
    const order = this.getElementData(userOrder);
    this.store.dispatch(bookingActions.updateFirstForm({ currentOrder: order }));
  }
}
