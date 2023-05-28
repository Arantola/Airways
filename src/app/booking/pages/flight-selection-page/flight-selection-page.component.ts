import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, combineLatest, Subscription } from 'rxjs';
import {
  appSettingsActions,
  bookingActions,
} from 'src/app/redux/actions/app.actions';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import {
  Airport,
  CurrentOrder,
  Flight,
  Ticket,
  saveTicketData,
} from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';
import { AIRPORTS } from 'src/app/shared/constants/airports';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../../core/components/modal-window/modal-window.component';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent implements OnInit, OnDestroy {
  public wayData?: Flight[];
  public wayBackData?: Flight[];
  public order?: CurrentOrder;

  public isRounded = true;
  public tourSelected = false;

  private order$ = this.store.select(selectCurrentOrder);

  public isContinueButtonDisabled = true;

  public isRounded$ = this.order$.pipe(map((order) => order.isRounded));

  public selectedFlightFrom$ = this.order$.pipe(
    map((order) => order.selectedFlightFrom)
  );

  public selectedFlightBack$ = this.order$.pipe(
    map((order) => order.selectedFlightBack)
  );

  public isContinueButtonDisabled$ = combineLatest([
    this.selectedFlightFrom$,
    this.selectedFlightBack$,
    this.isRounded$,
  ]).pipe(
    map(([selectedFlightFrom, selectedFlightBack, isRounded]) => {
      return !(
        (isRounded &&
          selectedFlightFrom !== undefined &&
          selectedFlightBack !== undefined) ||
        (!isRounded && selectedFlightFrom !== undefined)
      );
    })
  );

  private orderSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog,
    private flightService: FlightDataService,
    private authService: AuthService
  ) {
    this.orderSubscription = this.order$.subscribe((order) => {
      this.order = order;
      this.isRounded = order.isRounded;

      if (
        order.departurePoint?.city !== undefined &&
        order.destinationPoint?.city !== undefined
      ) {
        this.flightService
          .getFlightsByIATA(
            order.departurePoint.iata,
            order.destinationPoint.iata
          )
          .subscribe((response) => {
            this.wayData = response;
          });
      }
      if (
        order.isRounded === true &&
        order.departurePoint?.city !== undefined &&
        order.destinationPoint?.city !== undefined
      ) {
        this.flightService
          .getFlightsByIATA(
            order.destinationPoint.iata,
            order.departurePoint.iata
          )
          .subscribe((response) => {
            this.wayBackData = response;
          });
      }
    });
  }

  transformParamToDate(param: string | null): Date | undefined {
    if (param === null) {
      return undefined;
    }

    return new Date(param);
  }

  transformParamToAirport(iata: string | null): Airport | undefined {
    if (iata === null) {
      return undefined;
    }

    return AIRPORTS.find((airport) => airport.iata === iata);
  }

  ngOnInit() {
    this.correctnessCheck();
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[0] })
    );
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

  private correctnessCheck() {
    if (
      typeof this.order?.departurePoint === 'undefined' ||
      typeof this.order.destinationPoint === 'undefined' ||
      ((typeof this.order.date.start === 'undefined' ||
        typeof this.order.date.end === 'undefined') &&
        typeof this.order.singleDate === 'undefined')
    ) {
      this.router.navigate(['/main']);
    }
  }

  get startOrderDate(): Date {
    let date = this.order?.date?.start;
    if (!this.isRounded) {
      date = this.order?.singleDate;
    }

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

  public toNextStep() {
    if (!this.authService.isLoggedIn) {
      this.dialog.open(ModalWindowComponent, { data: { type: 'signin' } });
    } else {
      this.router.navigate(['booking', BOOKING_PAGES[1]]);
    }
  }

  public createTicket(flight: Flight, finishTime: string): Ticket {
    return {
      flight: flight,
      finishTime,
    };
  }

  public saveTicket(saveTicketData: saveTicketData) {
    const ticket = this.createTicket(
      saveTicketData.flight,
      saveTicketData.finishTime
    );

    if (saveTicketData.isWayBack) {
      this.store.dispatch(
        bookingActions.updateFlightBack({ flightBack: ticket })
      );
    } else {
      this.store.dispatch(
        bookingActions.updateFlightFrom({ flightFrom: ticket })
      );
    }
  }

  public deleteTicket(isWayBack: boolean): void {
    if (isWayBack) {
      this.store.dispatch(
        bookingActions.updateFlightBack({ flightBack: undefined })
      );
    } else {
      this.store.dispatch(
        bookingActions.updateFlightFrom({ flightFrom: undefined })
      );
    }
  }
}
