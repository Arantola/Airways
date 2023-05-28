import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { UserOrdersService } from 'src/app/shared/services/user-orders.service';
import { ordersActions } from '../actions/app.actions';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private userOrdersService: UserOrdersService,
  ) {}

  public loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.loadOrders),
    exhaustMap(() => this.userOrdersService.getAllOrders()
      .pipe(
        map(orders => ordersActions.completeOrdersLoad({ orders })),
        catchError(() => EMPTY)
      ))
    )
  );

  public saveOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.saveOrder),
    exhaustMap((action) => this.userOrdersService.saveNewOrder(action.order)
      .pipe(
        map(({ name }) => ordersActions.orderSaved({ userOrder: { [name]: action.order } })),
        catchError(() => EMPTY),
      ),
    )
  ));

  public deleteOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.deleteOrder),
    exhaustMap((action) => this.userOrdersService.deleteOrder(action.id)
      .pipe(
        map(() => ordersActions.orderDeleted({id: action.id})),
        catchError(() => EMPTY)
      ))
    ));

  public updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.updateOrder),
    exhaustMap((action) => this.userOrdersService.overwriteOrder(action.userOrder)
      .pipe(
        map(() => ordersActions.orderUpdated({
          update: {
            id: Object.keys(action.userOrder)[0],
            changes: action.userOrder
          }
        })),
        catchError(() => EMPTY)
      ))
    ));
}
