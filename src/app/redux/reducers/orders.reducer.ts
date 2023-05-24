import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserOrder } from 'src/app/shared/interfaces/interfaces';
import { ordersActions } from '../actions/app.actions';

export const orderAdapter = createEntityAdapter<UserOrder>()

const initialState = orderAdapter.getInitialState();

export type OrdersState = typeof initialState;

export const ordersReducer = createReducer(
  initialState,
  on(ordersActions.completeOrdersLoad, (state, action) => orderAdapter.setMany(action.orders, state)),
);
