import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserOrder } from 'src/app/shared/interfaces/interfaces';
import { ordersActions } from '../actions/app.actions';

export const orderAdapter = createEntityAdapter<UserOrder>({
  selectId: (userOrder) => Object.keys(userOrder)[0]
})

const initialState = orderAdapter.getInitialState();

export type OrdersState = typeof initialState;

export const ordersReducer = createReducer(
  initialState,
  on(
    ordersActions.completeOrdersLoad,
    (state, action) => {
      return orderAdapter.setMany(action.orders, state);
    }
  ),
  on(
    ordersActions.orderSaved,
    (state, action) => orderAdapter.upsertOne(action.userOrder, state)
  ),
  on(
    ordersActions.orderDeleted,
    (state, action) => orderAdapter.removeOne(action.id, state)
  ),
  on(
    ordersActions.orderUpdated,
    (state, action) => orderAdapter.updateOne(action.update, state)
  ),
);
