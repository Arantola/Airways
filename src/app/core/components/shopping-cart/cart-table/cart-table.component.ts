import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { BOOKING_PAGES, CART_COLUMNS } from 'src/app/shared/constants/constants';
import { Store } from '@ngrx/store';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { combineLatest, tap } from 'rxjs';
import { selectPassengersCompound } from 'src/app/redux/selectors/app.selectors';
import { PassengersCompound } from 'src/app/shared/interfaces/interfaces';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

interface PeriodicElement {
  no: string | undefined;
  flight: string;
  typeTrip: string;
  dataTime: string[];
  passengers: PassengersCompound;
  price: number | undefined;
}

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements AfterViewInit{
  ELEMENT_DATA: PeriodicElement[] = [];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @Input() showControls = true;

  @Input() showLink = false;

  @Input() currency = 'EUR';

  private order$ = this.store.select(selectCurrentOrder).subscribe(
    (order) => {
      let obj: PeriodicElement = {
        no: order.selectedFlightFrom?.flight?.id,
        flight: `${order.departurePoint?.city} — ${order.destinationPoint?.city} — ${order.departurePoint?.city}`,
        typeTrip: order.isRounded ? 'Round trip' : 'One way',
        dataTime: [
          `${this.transformDateFormat(order.selectedFlightFrom?.flight?.date)},
          ${order.selectedFlightFrom?.flight?.startTime} — ${order.selectedFlightFrom?.finishTime}`,
          `${this.transformDateFormat(order.selectedFlightBack?.flight?.date)},
          ${order.selectedFlightBack?.flight?.startTime} — ${order.selectedFlightBack?.finishTime}`
        ],
        passengers: order.passengersCompound,
        price: 0,
      }
      this.ELEMENT_DATA.push(obj);
    }
  );

  @ViewChild(MatSort)
  sort?: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private store: Store
  ) { }

  private transformDateFormat(date: string | undefined) {
    if (date === undefined) {
      return;
    }
    const newDate = formatDate(date, 'd, MMM, YYYY', 'en')
    return newDate;
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

  public editTicket() {
    this.router.navigate(['/booking', BOOKING_PAGES[0]])
  }
}
