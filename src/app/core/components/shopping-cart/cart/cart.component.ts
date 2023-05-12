import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
import { Component, Input, OnInit } from '@angular/core';
import { selectAllTickets, selectSettingsState } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() public sum?: number;

  private tickets$ = this.store.select(selectAllTickets);

  public currency = 'EUR';

  private settings$ = this.store.select(selectSettingsState);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'cart' }));
    const prices: number[] = []

    this.tickets$.subscribe((tickets) => {
      for (let ticket of tickets) {
        prices.push(ticket.price ?? 0);
      }
    })
    this.sum = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    this.settings$.subscribe((settings) => {
      this.currency = settings.currency
    })
  }
}
