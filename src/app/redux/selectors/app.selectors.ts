import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AppSettings,
  CurrentOrder,
} from 'src/app/shared/interfaces/interfaces';
import { TicketsState, ticketsAdapter } from '../reducers/tickets.reducer';

export const selectSettingsState =
  createFeatureSelector<AppSettings>('settingsState');

export const selectCurrentPage = createSelector(
  selectSettingsState,
  (state) => state.currentPage
);

export const selectCurrentOrder =
  createFeatureSelector<CurrentOrder>('currentOrderState');

export const selectPassengersCompound = createSelector(
  selectCurrentOrder,
  (state) => state.passengersCompound
);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = ticketsAdapter.getSelectors();

export const selectTicketsState = createFeatureSelector<TicketsState>('tickets');

export const selectAllTickets = createSelector(
  selectTicketsState,
  selectAll,
);

export const selectTicketsTotal = createSelector(
  selectTicketsState,
  selectTotal
);