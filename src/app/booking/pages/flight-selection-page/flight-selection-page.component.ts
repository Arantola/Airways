import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, combineLatest, Subject, takeUntil } from 'rxjs';
import { appSettingsActions, bookingActions } from 'src/app/redux/actions/app.actions';
import { selectCurrentOrder, selectTicketsTotal } from 'src/app/redux/selectors/app.selectors';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import { CurrentOrder, Flight, Ticket, saveTicketData } from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';

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
  public ticketsTotal$ = this.store.select(selectTicketsTotal);

  public isContinueButtonDisabled = true;

  public isRounded$ = this.order$.pipe(
    map((order) => order.isRounded)
  )

  public isContinueButtonDisabled$ = combineLatest([
    this.ticketsTotal$,
    this.isRounded$,
  ]).pipe(
    map(([ticketsTotal, isRounded]) => {
      const expectedTicketsTotal = isRounded ? 2 : 1;

      return ticketsTotal < expectedTicketsTotal;
    })
  );

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private store: Store,
    private flightService: FlightDataService
  ) {}

  ngOnInit() {
    this.order$.pipe(takeUntil(this.destroy$)).subscribe((order) => {
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

  ngOnDestroy(): void {
    this.destroy$.complete();
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
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[1] })
    );
    this.router.navigate(['booking', BOOKING_PAGES[1]]);
  }

  public createTicket(flight: Flight, isWayBack: boolean, finishTime: string): Ticket {
    return {
      isWayBack: isWayBack,
      date: flight.date,
      startTime: flight.startTime,
      finishTime,
      travelTime: flight.travelTime,
      departurePoint: flight.departurePoint,
      destinationPoint: flight.destinationPoint,
      flightNumber: flight.id,
      price: flight.price
    };
  }

  public saveTicket(saveTicketData: saveTicketData) {
    console.log('saveTrip')
      const ticket = this.createTicket(
        saveTicketData.flight,
        saveTicketData.isWayBack,
        saveTicketData.finishTime
      );
      this.store.dispatch(
        bookingActions.selectedTicket({ ticket: ticket })
      );
  }

  public deleteTicket(id: string): void {
    this.store.dispatch(
      bookingActions.deletedTicket({id})
    );
  }
}
