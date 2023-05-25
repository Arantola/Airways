import { Store } from '@ngrx/store';
import { appSettingsActions, bookingActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Component, Input, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';
import { PassengersCompound, UserOrder } from 'src/app/shared/interfaces/interfaces';
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
export class CartComponent implements OnInit, AfterViewInit{
  @Input() public sum?: number;

  public currency = 'EUR';

  public allOrdersSelected = false;

  public tableData: PeriodicElement[] = [];

  private orders?: UserOrder[];

  private ordersPayable = [];

  private destroy$ = new Subject();

  public dataSource = new MatTableDataSource(this.tableData);

  @ViewChild(MatSort)
  sort?: MatSort;

  constructor(
    private store: Store,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'cart' }));
    this.store.dispatch(ordersActions.loadOrders());
    this.store.select(selectOrders).pipe(takeUntil(this.destroy$)).subscribe(
      (orders) => {
        this.orders = orders;
        console.log('orders', orders)
        const tableData: PeriodicElement[] = [];
        for (let userOrder of orders) {

          for (let orderKey of Object.keys(userOrder)) {
            const order = userOrder[orderKey];

            let obj: PeriodicElement = {
              no: order.selectedFlightFrom?.flight?.id,
              flight: `${order.departurePoint?.city} — ${order.destinationPoint?.city}
              ${order.isRounded ? `— ${order.departurePoint?.city}` : ''}`,
              typeTrip: order.isRounded ? 'Round trip' : 'One way',
              dataTime: [
                `${this.transformDateFormat(order.selectedFlightFrom?.flight?.date)},
                ${order.selectedFlightFrom?.flight?.startTime} —
                ${order.selectedFlightFrom?.finishTime}`,
                order.isRounded ?
                `${this.transformDateFormat(order.selectedFlightBack?.flight?.date)},
                ${order.selectedFlightBack?.flight?.startTime} —
                ${order.selectedFlightBack?.finishTime}` :
                ''
              ],
              passengers: order.passengersCompound,
              price: order.totalCost,
              id: orderKey,
            }
            tableData.push(obj);
          }
        }

        console.log(tableData);
        this.tableData = tableData;
        this.dataSource.data = tableData;
      })
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
    const userOrderId = Object.keys(userOrder)[0];
    const currentOrder = userOrder[userOrderId];
    this.store.dispatch(bookingActions.updateFirstForm({ currentOrder }))
    this.router.navigate(['/main', BOOKING_PAGES[0]])
  }

  public onAllOrdersSelected() {
    if (this.allOrdersSelected) {
      //выбираем все заказы и пушим в ordersPayable
    } else {
      //удаляем все заказы
    }
  }

  public addOrderToPayment(no: string) {
    //берем все заказы и ищем по номеру, после добавляем в массив
    //если ordersPayable === orders, то allOrdersSelected === true
  }

  public orderSelected(event: MatCheckboxChange) {
    console.log(event.source.value)
    console.log(event.checked)
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
}
