import { Component, Input, OnInit } from '@angular/core';
import { CurrentOrder, Prices } from 'src/app/shared/interfaces/interfaces';
import { CostCalculationService } from 'src/app/shared/services/cost-calculation.service';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.scss'],
})
export class FlightFareComponent implements OnInit {
  @Input() currentOrder!: CurrentOrder;

  private defaultPrice!: number;

  public prices!: Prices;
  public totalCost!: number;

  constructor(private costService: CostCalculationService) {}

  ngOnInit(): void {
    this.defaultPrice = this.costService.getCostForOnePerson(this.currentOrder);
    this.prices = this.costService.getPrices(
      this.defaultPrice,
      this.currentOrder.passengersCompound
    );
    this.totalCost = this.costService.getTotalCost(this.prices);
  }

  get adultsCount(): number {
    return this.currentOrder.passengersCompound.adults;
  }

  get childrenCount(): number {
    return this.currentOrder.passengersCompound.children;
  }
  get infantsCount(): number {
    return this.currentOrder.passengersCompound.infants;
  }
}
