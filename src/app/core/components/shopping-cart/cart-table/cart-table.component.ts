import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { BOOKING_PAGES, CART_COLUMNS } from 'src/app/shared/constants/constants';
import { Store } from '@ngrx/store';
import { PeriodicElement } from '../cart/cart.component';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements AfterViewInit, OnChanges {
  @Input() tableData: PeriodicElement[] = [];

  @Input() allOrdersSelected = false;

  @Input() showControls = true;

  @Input() showLink = false;

  @Input() currency = 'EUR';

  public dataSource = new MatTableDataSource(this.tableData);

  public isOrdersSelected = false;

  @Output() orderSubmit = new EventEmitter<string>();

  @ViewChild(MatSort)
  sort?: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private store: Store
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    const { tableData, isOrdersSelected } = changes;
    if (tableData !== undefined) {
      this.dataSource.data = tableData.currentValue;
    }
  }

  onOrderSelected(no: string) {
    this.orderSubmit.emit(no)
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
