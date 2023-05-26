import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingActions } from 'src/app/redux/actions/app.actions';
import { CurrentOrder, Prices } from 'src/app/shared/interfaces/interfaces';
import { CostCalculationService } from 'src/app/shared/services/cost-calculation.service';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.scss'],
})
export class FlightFareComponent implements OnInit, OnDestroy {
  @Input() currentOrder!: CurrentOrder;

  private defaultPrice!: number;
  public prices!: Prices;
  public pricesForDisplay!: Prices;
  public totalCost!: number;
  public totalCostForDisplay!: number;
  public settings$ = this.store.select(selectSettingsState);
  private settingsSubscription?: Subscription;
  public currency = 'EUR';

  constructor(private costService: CostCalculationService, private store: Store) {}

  ngOnInit(): void {
    this.defaultPrice = this.costService.getCostForOnePerson(this.currentOrder);
    this.prices = this.costService.getPrices(
      this.defaultPrice,
      this.currentOrder.passengersCompound
    );
    this.totalCost = this.costService.getTotalCost(this.prices);
    this.store.dispatch(bookingActions.addTotalCost({ totalCost: this.totalCost }));
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
