
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSettingsState } from 'src/app/redux/selectors/app.selectors';
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

  constructor(
    private store: Store,
    private costService: CostCalculationService,
    private currencyService: CurrencyService,
  ) {}

  ngOnInit(): void {
    this.defaultPrice = this.costService.getCostForOnePerson(this.currentOrder);
    this.prices = this.costService.getPrices(
      this.defaultPrice,
      this.currentOrder.passengersCompound
    );
    this.totalCost = this.costService.getTotalCost(this.prices);

    this.settingsSubscription = this.settings$.subscribe(
      (settings) => {
        this.currency = settings.currency;
        this.pricesForDisplay = {
          adultPrice: this.currencyService.calculateCurrencyValue(<number>this.prices?.adultPrice, this.currency),
          adultFare: this.currencyService.calculateCurrencyValue(<number>this.prices?.adultFare, this.currency),
          adultTax: this.currencyService.calculateCurrencyValue(<number>this.prices?.adultTax, this.currency),
          childPrice: this.currencyService.calculateCurrencyValue(<number>this.prices?.childPrice, this.currency),
          childFare: this.currencyService.calculateCurrencyValue(<number>this.prices?.childFare, this.currency),
          childTax: this.currencyService.calculateCurrencyValue(<number>this.prices?.childTax, this.currency),
          infantPrice: this.currencyService.calculateCurrencyValue(<number>this.prices?.infantPrice, this.currency),
          infantFare: this.currencyService.calculateCurrencyValue(<number>this.prices?.infantFare, this.currency),
          infantTax: this.currencyService.calculateCurrencyValue(<number>this.prices?.infantTax, this.currency),
        }
        this.totalCostForDisplay = this.currencyService.calculateCurrencyValue(<number>this.totalCost, this.currency);
      }
    )
    this.store.dispatch(bookingActions.addTotalCost({ totalCost: this.totalCost }));
  }

  ngOnDestroy(): void {
    this.settingsSubscription?.unsubscribe();
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
