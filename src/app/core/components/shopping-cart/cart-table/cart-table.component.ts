import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PeriodicElement {
  no: string;
  flight: string[];
  typeTrip: string;
  dataTime: string[];
  passengers: string[];
  price: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 'FR 1925',
    flight: ['Dublin — Warsaw', 'Modlin — Dublin'],
    typeTrip: 'Round Trip',
    dataTime: ['1 Mar, 2023, 8:40 — 12:00', '18 Mar, 2023, 7:40 — 11:00'],
    passengers: ['1 x Adult', '1 x Child', '1 x Infant'],
    price: 551,
  },
  {
    no: 'FR 1922',
    flight: ['Modlin — Dublin', 'Dublin — Warsaw'],
    typeTrip: 'Round Trip',
    dataTime: ['2 Mar, 2023, 8:40 — 12:00', '19 Mar, 2023, 7:40 — 11:00'],
    passengers: ['1 x Adult', '1 x Child', '1 x Infant'],
    price: 651,
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

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  public get displayedColumns(): string[] {
    let columns = [
      'No',
      'Flight',
      'Type trip',
      'Data & time',
      'Passengers',
      'Price',
    ];

    if(this.showLink) {
      columns = [
        ...columns,
        'Link',
      ]
    }

    if (this.showControls) {
      columns = [
        'Checkbox',
        ...columns,
        'Menu',
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
}
