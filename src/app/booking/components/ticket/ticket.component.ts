import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input() isWayBack = false;

  @Input() flight?: Flight;

  public selected = false;

  @Output() ticketSelected = new EventEmitter<boolean>();

  public toggleTicket() {
    this.selected = !this.selected;
    this.ticketSelected.emit(this.selected);
  }

  get finishTime(): string {
    if (this.flight === undefined) {
      return '00:00'
    }
    let startDateTime = new Date(`${this.flight.date} ${this.flight.startTime}`)
    const [hours, minutes] = this.flight.travelTime.split(':').map((item) => Number(item));
    const finishTime = new Date(startDateTime.getTime());
    finishTime.setHours(startDateTime.getHours() + hours, startDateTime.getMinutes() + minutes);
    console.log(finishTime)
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

  get currency(): string {
    return '$';
  }
}
