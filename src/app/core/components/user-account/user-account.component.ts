import { Store } from '@ngrx/store';
import { appSettingsActions, ordersActions } from 'src/app/redux/actions/app.actions';
import { Component } from '@angular/core';
import { UserOrder } from 'src/app/shared/interfaces/interfaces';
import { selectPaidOrders } from 'src/app/redux/selectors/orders.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  public orders?: UserOrder[];
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    this.store.select(selectPaidOrders).pipe(takeUntil(this.destroy$)).subscribe(
      (orders) => {
        this.orders = orders;
      },
    );
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
