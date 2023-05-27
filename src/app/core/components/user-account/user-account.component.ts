import { Store } from '@ngrx/store';
import { appSettingsActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Component } from '@angular/core';
import { UserOrder } from 'src/app/shared/interfaces/interfaces';
import { selectOrders } from 'src/app/redux/selectors/orders.selectors';
import { Subject, takeUntil } from 'rxjs';
import { selectSettingsState } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  public orders?: UserOrder[];
  public currency = 'EUR';
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    this.store.select(selectOrders).pipe(takeUntil(this.destroy$)).subscribe(
      (orders) => {
        this.orders = orders;
      },
    );
    this.store.select(selectSettingsState).pipe(takeUntil(this.destroy$)).subscribe(
      (settings) => {
        this.currency = settings.currency;
      }
    )
  }

  ngOnInit(): void {
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'account' }));
    this.store.dispatch(ordersActions.loadOrders());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
