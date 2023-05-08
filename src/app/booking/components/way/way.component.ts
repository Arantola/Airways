import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DateCarouselItem } from '../date-carousel/date-carousel.component';
import { Airport, CurrentOrder, Flight } from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';

@Component({
  selector: 'app-way',
  templateUrl: './way.component.html',
  styleUrls: ['./way.component.scss']
})
export class WayComponent implements OnInit, OnChanges {
  @Input() public isWayBack = false;

  @Input() public tripData?: Flight[];

  @Input() public activeItems: DateCarouselItem[] = [];

  @Input() public order?: CurrentOrder;

  @Input() public selectedDate = new Date();

  public selectedTicket?: boolean;

  public constructor(
    private flightService: FlightDataService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { tripData } = changes;

    if (tripData) {
      const flights: Flight[] = tripData.currentValue;

      this.activeItems = flights.map((flight) => {
        const date = new Date(flight.date);
        date.setHours(0, 0, 0);

        return {
          date,
          dateCard: {
            date,
            currency: '€',
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

  public ngOnInit(): void {
  }

  public getFlightsOnDay(date: Date): Flight[] {
    return this.tripData?.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0);
      return itemDate.getTime() == date.getTime();
    }) ?? [];
  }
}
