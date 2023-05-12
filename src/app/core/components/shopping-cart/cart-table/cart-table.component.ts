import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { BOOKING_PAGES, CART_COLUMNS } from 'src/app/shared/constants/constants';
import { Store } from '@ngrx/store';
import { selectAllTickets } from 'src/app/redux/selectors/app.selectors';
import { combineLatest } from 'rxjs';
import { selectPassengersCompound } from 'src/app/redux/selectors/app.selectors';
import { PassengersCompound } from 'src/app/shared/interfaces/interfaces';

interface PeriodicElement {
  no: string;
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

  private tickets$ = this.store.select(selectAllTickets);

  private passengers$ = this.store.select(selectPassengersCompound);

  private tableData$ = combineLatest([
    this.tickets$,
    this.passengers$,
  ]).subscribe(([tickets, passengers]) => {

    for (let ticket of tickets) {
      let obj = {
        no: ticket.flightNumber,
        flight: `${ticket.departurePoint?.city} — ${ticket.destinationPoint?.city}`,
        typeTrip: 'Round Trip',
        dataTime: ['6 Mar, 2023, 8:40 — 12:00', '19 Mar, 2023, 7:40 — 11:00'],
        passengers,
        price: ticket.price,
      };

      this.ELEMENT_DATA.push(obj);
    }
  })

  @ViewChild(MatSort)
  sort?: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private store: Store
  ) { }


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
