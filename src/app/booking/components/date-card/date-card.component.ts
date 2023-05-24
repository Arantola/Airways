import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppSettings, DateCard } from 'src/app/shared/interfaces/interfaces';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss']
})
export class DateCardComponent implements OnInit, OnDestroy {
  @Input() public date = new Date();
  @Input() public isSelected = false;
  @Input() public dateCard?: DateCard;
  @Input() public settings$!: Observable<AppSettings>;
  public currency = 'EUR';
  public price!: number;
  private settingsSubscription?: Subscription;

  constructor(
    private currencyService: CurrencyService,
  ) {}

  get isDisabled(): boolean {
    return this.dateCard === undefined;
  }

  get seats(): number {
    return this.dateCard?.seats ?? 0;
  }

  ngOnInit(): void {
    this.settingsSubscription = this.settings$.subscribe(
      (settings) => {
        this.currency = settings.currency;
        if (this.dateCard) {
          this.price = this.currencyService.calculateCurrencyValue(<number>this.dateCard?.price, this.currency);
        }
      }
    )
  }

  ngOnDestroy() {
    this.settingsSubscription?.unsubscribe();
  }
}
