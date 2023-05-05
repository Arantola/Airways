import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarouselItem } from '../date-carousel/date-carousel.component';
import { FirebaseFlight, Flight } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input() isWayBack = false;

  @Input() flight?: CarouselItem;

  @Input()
  public tripData?: Flight[];

  public selected = false;

  @Output() ticketSelected = new EventEmitter<boolean>();

  public toggleTicket() {
    this.selected = !this.selected;
    this.ticketSelected.emit(this.selected);
  }
}
