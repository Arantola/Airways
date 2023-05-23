import { Injectable } from '@angular/core';
import {
  CurrentOrder,
  PassengersCompound,
  Prices,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CostCalculationService {
  getCostForOnePerson(currentOrder: CurrentOrder): number {
    const flightFromPrice = currentOrder.selectedFlightFrom?.flight?.price;
    const flightBackPrice = currentOrder.selectedFlightBack?.flight?.price || 0;
    return Number(flightFromPrice!) + Number(flightBackPrice);
  }

  getPrices(defeaultPrice: number, passengers: PassengersCompound): Prices {
    const [adults, children, infants] = [
      passengers.adults,
      passengers.children,
      passengers.infants,
    ];
    return {
      adultPrice: defeaultPrice * adults,
      adultFare: defeaultPrice * 0.65 * adults,
      adultTax: defeaultPrice * 0.35 * adults,
      childPrice: defeaultPrice * 0.75 * children,
      childFare: defeaultPrice * 0.75 * 0.55 * children,
      childTax: defeaultPrice * 0.75 * 0.45 * children,
      infantPrice: defeaultPrice * 0.4 * infants,
      infantFare: defeaultPrice * 0.4 * 0.9 * infants,
      infantTax: defeaultPrice * 0.4 * 0.1 * infants,
    };
  }

  getTotalCost(prices: Prices): number {
    return prices.adultPrice + prices.childPrice + prices.infantPrice;
  }
}
