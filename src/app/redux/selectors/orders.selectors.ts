import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, orderAdapter } from '../reducers/orders.reducer';

const {
  selectAll,
} = orderAdapter.getSelectors();

const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectOrders = createSelector(
  selectOrdersState,
  (ordersState) => {
    const orders = selectAll(ordersState)
    return orders;
  },
)