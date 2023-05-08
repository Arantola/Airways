import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { BOOKING_PAGES, CART_COLUMNS } from 'src/app/shared/constants/constants';
import { PeriodicElement } from 'src/app/shared/interfaces/interfaces';

const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 'FR 1925',
    flight: ['Dublin — Warsaw', 'Modlin — Dublin'],
    typeTrip: 'Round Trip',
    dataTime: ['1 Mar, 2023, 8:40 — 12:00', '18 Mar, 2023, 7:40 — 11:00'],
    passengers: {
      adults: 1,
      children: 1,
      infants: 1,
    },
    price: 351,
  },
  {
    no: 'FR 1920',
    flight: ['Modlin — Dublin', 'Dublin — Warsaw'],
    typeTrip: 'Round Trip',
    dataTime: ['2 Mar, 2023, 8:40 — 12:00', '19 Mar, 2023, 7:40 — 11:00'],
    passengers: {
      adults: 1,
      children: 2,
      infants: 0,
    },
    price: 651,
  },
  {
    no: 'FR 1922',
    flight: ['Aodlin — Dublin', 'Dublin — Warsaw'],
    typeTrip: 'Round Trip',
    dataTime: ['6 Mar, 2023, 8:40 — 12:00', '19 Mar, 2023, 7:40 — 11:00'],
    passengers: {
      adults: 1,
      children: 2,
      infants: 0,
    },
    price: 551,
  },
];

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements AfterViewInit{
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @Input() showControls = true;

  @Input() showLink = false;

  @ViewChild(MatSort)
  sort?: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router) { }


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
