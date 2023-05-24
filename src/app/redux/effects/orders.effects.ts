import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { UserOrdersService } from 'src/app/shared/services/user-orders.service';
import { ordersActions } from '../actions/app.actions';

@Injectable()
export class OrdersEffects {
  public loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.loadOrders),
    exhaustMap(() => this.userOrdersService.getAllOrders()
      .pipe(
        map(orders => ordersActions.completeOrdersLoad({ orders })),
        catchError(() => EMPTY)
      ))
    )
  );

  public deleteOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.deleteOrder),
    exhaustMap((action) => this.userOrdersService.deleteOrder(action.id)
      .pipe(
        map(() => ({ type: '[Orders API] Orders Deleted' })),
        catchError(() => EMPTY)
      ))
    ));

  public updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.updateOrder),
    exhaustMap((action) => this.userOrdersService.overwriteOrder(action.userOrder)
      .pipe(
        map(() => ({ type: '[Orders API] Orders Updated' })),
        catchError(() => EMPTY)
      ))
    ));
 
  constructor(
    private actions$: Actions,
    private userOrdersService: UserOrdersService,
  ) {}
}