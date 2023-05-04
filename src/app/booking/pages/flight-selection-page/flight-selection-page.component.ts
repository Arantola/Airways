import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import { Flight } from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent implements OnInit {

  private order$ = this.store.select(selectCurrentOrder);

  public wayData?: Flight[];

  public isRounded = true;

  constructor(private router: Router, private store: Store, private flightService: FlightDataService) {}

  saveTicket() {
    this.router.navigate(['booking', BOOKING_PAGES[1]]);
  }

  ngOnInit() {

    this.order$.subscribe((order) => {
      console.log(order.departurePoint?.iata, order.destinationPoint?.iata)

      this.isRounded = order.type === 'rounded';

      if (order.departurePoint?.city !== undefined && order.destinationPoint?.city !== undefined) {
        this.flightService.getFlightsByIATA(order.departurePoint.iata, order.destinationPoint.iata)
          .subscribe((response) => { console.log(response); this.wayData = response; })
      }
    })
  }
}
