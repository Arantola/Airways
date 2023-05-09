import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { bookingActions } from 'src/app/redux/actions/app.actions';
import { selectAllTickets } from 'src/app/redux/selectors/app.selectors';
import { Flight } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input() isWayBack = false;

  @Input() flight?: Flight;

  @Input() currency = 'EUR';

  public selected = false;

  private tickets$ = this.store.select(selectAllTickets);

  @Output() ticketSelected = new EventEmitter<boolean>();

  constructor(private store: Store) {
  }

  public toggleTicket() {
    this.selected = !this.selected;
    this.ticketSelected.emit(this.selected);
  }

  public deleteTicket() {
    if (this.flight === undefined) {
      return
    }

    this.toggleTicket();
    this.store.dispatch(
      bookingActions.deletedTicket({id: this.flight.id})
    );
    this.tickets$.pipe(take(1)).subscribe((tickets) => {
      console.log(tickets)
    })
  }

  public saveTicket() {
    if (this.flight === undefined) {
      return;
    }

    this.toggleTicket();
    this.store.dispatch(
      bookingActions.selectedTicket({ticket: {
        isWayBack: this.isWayBack,
        date: this.flight.date,
        startTime: this.flight.startTime,
        finishTime: this.finishTime,
        travelTime: this.flight.travelTime,
        departurePoint: this.flight.departurePoint,
        destinationPoint: this.flight.destinationPoint,
        flightNumber: this.flight.id,
        price: this.flight.price
      }})
    );

    this.tickets$.pipe(take(1)).subscribe((tickets) => {
      console.log(tickets)
    })
  }

  get finishTime(): string {
    if (this.flight === undefined) {
      return '00:00'
    }
    let startDateTime = new Date(`${this.flight.date} ${this.flight.startTime}`)
    const [hours, minutes] = this.flight.travelTime.split(':').map((item) => Number(item));
    const finishTime = new Date(startDateTime.getTime());
    finishTime.setHours(startDateTime.getHours() + hours, startDateTime.getMinutes() + minutes);

    const hoursFinishTime = finishTime.getHours() < 10 ? `0${finishTime.getHours()}:`:`${finishTime.getHours()}:`;
    const minutesFinishTime = finishTime.getMinutes() < 10 ? `0${finishTime.getMinutes()}`:`${finishTime.getMinutes()}`;
    const finishTimeString = hoursFinishTime + minutesFinishTime;
    return finishTimeString;
  }

  get travelHours() {
    return this.flight?.travelTime.split(':')[0];
  }

  get travelMinutes() {
    return this.flight?.travelTime.split(':')[1];
  }
}
