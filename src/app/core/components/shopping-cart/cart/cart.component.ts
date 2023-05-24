import { Store } from '@ngrx/store';
import { appSettingsActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Component, Input, OnInit } from '@angular/core';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { formatDate } from '@angular/common';
import { PassengersCompound } from 'src/app/shared/interfaces/interfaces';
import { selectOrders } from 'src/app/redux/selectors/orders.selectors';

export interface PeriodicElement {
  no: string | undefined;
  flight: string;
  typeTrip: string;
  dataTime: string[];
  passengers: PassengersCompound;
  price: number | undefined;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() public sum?: number;

  public currency = 'EUR';

  public allOrdersSelected = false;

  public tableData: PeriodicElement[] = [];

  private ordersPayable = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'cart' }));
    this.store.dispatch(ordersActions.loadOrders());
    const orders$ = this.store.select(selectOrders).subscribe(
      (orders) => {
        const tableData: PeriodicElement[] = [];
        for (let userOrder of orders) {

          for (let orderKey of Object.keys(userOrder)) {
            const order = userOrder[orderKey];

            let obj: PeriodicElement = {
              no: order.selectedFlightFrom?.flight?.id,
              flight: `${order.departurePoint?.city} —
                ${order.destinationPoint?.city} —
                ${order.departurePoint?.city}`,
              typeTrip: order.isRounded ? 'Round trip' : 'One way',
              dataTime: [
                `${this.transformDateFormat(order.selectedFlightFrom?.flight?.date)},
                ${order.selectedFlightFrom?.flight?.startTime} —
                ${order.selectedFlightFrom?.finishTime}`,
                `${this.transformDateFormat(order.selectedFlightBack?.flight?.date)},
                ${order.selectedFlightBack?.flight?.startTime} —
                ${order.selectedFlightBack?.finishTime}`
              ],
              passengers: order.passengersCompound,
              price: order.totalCost,
            }
            tableData.push(obj);
          }
        }

        console.log(tableData);
        this.tableData = tableData;
      })


    // const prices: number[] = []

  //   const orders = [];
    
  //   const prices: number[] = []

  //   this.tickets$.subscribe((tickets) => {
  //     for (let ticket of tickets) {
  //       prices.push(ticket.price ?? 0);
  //     }
  //   })
  //   this.sum = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  //   this.settings$.subscribe((settings) => {
  //     this.currency = settings.currency
  //   })
  }

  private transformDateFormat(date: string | undefined) {
    if (date === undefined) {
      return;
    }
    const newDate = formatDate(date, 'd, MMM, YYYY', 'en')
    return newDate;
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
}
