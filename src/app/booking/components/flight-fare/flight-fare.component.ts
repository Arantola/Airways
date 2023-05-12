import { Component, Input, OnInit } from '@angular/core';
import { CurrentOrder, Ticket } from 'src/app/shared/interfaces/interfaces';

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

  countPassengers = {
    adult: 1,
    child: 0,
    infant: 0,
  }

  ngOnInit(): void {
    this.countPassengers = {
      adult: this.flightInfo.passengersCompound.adults,
      child: this.flightInfo.passengersCompound.children,
      infant: this.flightInfo.passengersCompound.infants,
    };

    this.getTotalCostForOnePerson();
    this.prices.fareForAdult = this.getFareAndTax(this.onePersonPrice, 0.65) * this.countPassengers.adult;
    this.prices.taxForAdult = this.getFareAndTax(this.onePersonPrice, 0.35) * this.countPassengers.adult;
    this.prices.priceForChild = (this.onePersonPrice * 0.75) * this.countPassengers.child;
    this.prices.fareForChild = this.getFareAndTax(this.onePersonPrice * 0.75, 0.55) * this.countPassengers.child;
    this.prices.taxForChild = this.getFareAndTax(this.onePersonPrice * 0.75, 0.45)  * this.countPassengers.child;
    this.prices.priceForInfant = (this.onePersonPrice * 0.4) * this.countPassengers.infant;
    this.prices.fareForInfant = this.getFareAndTax(this.onePersonPrice * 0.4, 0.9) * this.countPassengers.infant;
    this.prices.taxForInfant = this.getFareAndTax(this.onePersonPrice * 0.4, 0.1) * this.countPassengers.infant;
    this.getTotalCostForTickets();
  }

  getTotalCostForOnePerson() {
    const flightCost = this.ticketInfoData.map((ticket) => ticket.price);
    const oneWayPrice = flightCost[0];
    const twoWayPrice = flightCost[1];
    let onePersonPriceTotal;
    if (oneWayPrice && twoWayPrice) {
      onePersonPriceTotal = oneWayPrice + twoWayPrice;
    } else {
      onePersonPriceTotal = oneWayPrice;
    }
    this.onePersonPrice = <number>onePersonPriceTotal;
    this.prices.priceForAdult = this.onePersonPrice * this.countPassengers.adult;
  }

  getFareAndTax(value: number, percent: number): number {
    return value * percent;
  }

  getTotalCostForTickets() {
    this.totalCost = this.prices.priceForAdult + this.prices.priceForChild + this.prices.priceForInfant;
  }
}
