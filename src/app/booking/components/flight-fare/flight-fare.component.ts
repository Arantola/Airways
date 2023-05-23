import { Component, Input, OnInit } from '@angular/core';
import { CurrentOrder, PassengersCompound, Ticket } from 'src/app/shared/interfaces/interfaces';
import { CostCalculationService } from 'src/app/shared/services/cost-calculation.service';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.scss']
})
export class FlightFareComponent implements OnInit {
  @Input() flightInfo!: CurrentOrder;
  @Input() ticketInfoData!: Ticket[];
  onePersonPrice: number = 0;
  totalCost!: number;
  prices = {
    priceForAdult: 0,
    fareForAdult: 0,
    taxForAdult: 0,
    priceForChild: 0,
    fareForChild: 0,
    taxForChild: 0,
    priceForInfant: 0,
    fareForInfant: 0,
    taxForInfant: 0,
  }
  countPassengers!: PassengersCompound;

  constructor(private costService: CostCalculationService) {}

  ngOnInit(): void {
    // this.countPassengers = this.flightInfo.passengersCompound;
    // this.onePersonPrice = <number>this.costService.getTotalCostForOnePerson(this.ticketInfoData);
    // this.prices = this.costService.getPrices(
    //   this.onePersonPrice,
    //   this.countPassengers.adults,
    //   this.countPassengers.children,
    //   this.countPassengers.infants,
    // );
    // this.totalCost = this.costService.getTotalCostForTickets(
    //   this.prices.priceForAdult,
    //   this.prices.priceForChild,
    //   this.prices.priceForInfant
    // );
  }
}
