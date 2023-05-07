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
  // departureCity: string | undefined;
  // arrivalCity: string | undefined;
  // departureDate: string | Date |undefined;
  flightInfo!: CurrentOrder;

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectCurrentOrder).subscribe((order) => {
      this.flightInfo = order;
      // console.log(order);
      // this.isRoundTrip = order.isRounded;
      // this.departureCity = order.departurePoint?.city;
      // this.arrivalCity = order.destinationPoint?.city;
      // this.departureDate = order.date.start;
    })
  }
}
