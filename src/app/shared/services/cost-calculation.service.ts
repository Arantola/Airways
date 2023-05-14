import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CostCalculationService {

  constructor() { }

  getTotalCostForOnePerson(ticketInfoData: Ticket[]): number | undefined {
    const flightCost = ticketInfoData.map((ticket) => ticket.price);
    const oneWayPrice = flightCost[0];
    const twoWayPrice = flightCost[1];
    let onePersonPriceTotal;
    if (oneWayPrice && twoWayPrice) {
      onePersonPriceTotal = oneWayPrice + twoWayPrice;
    } else {
      onePersonPriceTotal = oneWayPrice;
    }
    return onePersonPriceTotal;
  }

  getPrices(
    onePersonPrice: number,
    adultsCount: number,
    childrenCount: number,
    infantsCount: number
  ) {
    return {
      priceForAdult: onePersonPrice * adultsCount,
      fareForAdult: onePersonPrice * 0.65 * adultsCount,
      taxForAdult: onePersonPrice * 0.35 * adultsCount,
      priceForChild: onePersonPrice * 0.75 * childrenCount,
      fareForChild: onePersonPrice * 0.75 * 0.55 * childrenCount,
      taxForChild: onePersonPrice * 0.75 * 0.45  * childrenCount,
      priceForInfant: onePersonPrice * 0.4 * infantsCount,
      fareForInfant: onePersonPrice * 0.4 * 0.9 * infantsCount,
      taxForInfant: onePersonPrice * 0.4 * 0.1 * infantsCount,
    }
  }

  getTotalCostForTickets(
    adultsCost: number,
    childrenCost: number,
    infantCost: number,
  ): number {
    return adultsCost + childrenCost + infantCost;
  }
}
