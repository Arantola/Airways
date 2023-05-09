import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import { CurrentOrder, Flight } from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent implements OnInit {

  private order$ = this.store.select(selectCurrentOrder);

  public wayData?: Flight[];

  public wayBackData?: Flight[];

  public order?: CurrentOrder;

  public isRounded = true;

  constructor(
    private router: Router,
    private store: Store,
    private flightService: FlightDataService) {}

  saveTicket() {
    this.router.navigate(['booking', BOOKING_PAGES[1]]);
  }

  ngOnInit() {
    this.order$.subscribe((order) => {
      this.order = order;
      this.isRounded = order.isRounded;

      if (order.departurePoint?.city !== undefined &&
        order.destinationPoint?.city !== undefined) {
        this.flightService.getFlightsByIATA(order.departurePoint.iata, order.destinationPoint.iata)
          .subscribe((response) => { this.wayData = response; })
      }
      if (order.isRounded === true &&
        order.departurePoint?.city !== undefined &&
        order.destinationPoint?.city !== undefined) {
        this.flightService.getFlightsByIATA(order.destinationPoint.iata, order.departurePoint.iata)
          .subscribe((response) => { this.wayBackData = response; })
      }
    })
  }

  get startOrderDate(): Date {
    let date = this.order?.date?.start;

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (date === undefined) {
      date = new Date();
    }

    return date;
  }

  get endOrderDate(): Date {
    let date = this.order?.date?.end;

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (date === undefined) {
      date = new Date();
    }

    return date;
  }
}
