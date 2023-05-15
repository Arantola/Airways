import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DateCarouselItem } from '../date-carousel/date-carousel.component';
import { Airport, CurrentOrder, Flight, saveTicketData } from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { selectSettingsState } from 'src/app/redux/selectors/app.selectors';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-way',
  templateUrl: './way.component.html',
  styleUrls: ['./way.component.scss']
})
export class WayComponent implements OnChanges {
  @Input() public isWayBack = false;
  @Input() public activeItems: DateCarouselItem[] = [];
  @Input() public selectedDate = new Date();
  @Input() public tourSelected = false;

  @Input() public tripData?: Flight[];
  @Input() public order?: CurrentOrder;
  
  @Output() ticketSave = new EventEmitter<saveTicketData>();
  @Output() ticketDelete = new EventEmitter<string>();

  public isSelectedTicket = false;
  public currency = 'EUR';

  private settings$ = this.store.select(selectSettingsState);
  private settingsSubscription?: Subscription;

  public constructor(private store: Store) {
    this.settingsSubscription = this.settings$.subscribe(
      (settings) => {
        this.currency = settings.currency;
      }
    )
  }

  ngOnDestroy(): void {
    this.settingsSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { tripData } = changes;

    if (tripData && tripData.currentValue) {
      const flights: Flight[] = tripData.currentValue;

      this.activeItems = flights.map((flight) => {
        const date = new Date(flight.date);
        date.setHours(0, 0, 0);

        return {
          date,
          dateCard: {
            date,
            currency: this.currency,
            locale: 'en',
            price: flight.price,
            seats: flight.availableTickets,
          }
        };
      })
    }
  }

  public get destinationPoint(): Airport | undefined {
    if (this.order === undefined) {
      return undefined;
    }

    return this.isWayBack ? this.order.departurePoint : this.order.destinationPoint;
  }

  public get departurePoint(): Airport | undefined {
    if (this.order === undefined) {
      return undefined;
    }

    return this.isWayBack ? this.order.destinationPoint : this.order.departurePoint;
  }

  public getFlightsOnDay(date: Date): Flight[] {
    return this.tripData?.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0);

      return itemDate.getTime() == date.getTime();
    }) ?? [];
  }

  public onTicketSelected(isSelected: boolean): void {
    this.isSelectedTicket = isSelected;
  }

  public onTicketSave(saveTicketData: saveTicketData): void {
    this.ticketSave.emit(saveTicketData);
  }

  public onTicketDelete(id: string): void {
    this.ticketDelete.emit(id);
  }
}
