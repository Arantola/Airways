import { selectCurrentOrder } from './../../../redux/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {
  isRoundTrip = true;
  flightInfo!: CurrentOrder;

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectCurrentOrder).subscribe((order) => {
      this.flightInfo = order;
    })
    this.isRoundTrip = this.flightInfo.isRounded;
  }
}
