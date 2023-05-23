import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AppSettings,
  CurrentOrder,
} from 'src/app/shared/interfaces/interfaces';


export const selectSettingsState =
  createFeatureSelector<AppSettings>('settingsState');

export const selectCurrentPage = createSelector(
  selectSettingsState,
  (state) => state.currentPage
);

export const selectUserName = createSelector(
  selectSettingsState,
  (state) => state.userName
);

export const selectCurrentOrder =
  createFeatureSelector<CurrentOrder>('currentOrderState');

export const selectPassengersCompound = createSelector(
  selectCurrentOrder,
  (state) => state.passengersCompound
);

export const selectFlightFrom = createSelector(
  selectCurrentOrder,
  (state) => state.selectedFlightFrom
);

export const selectFlightBack = createSelector(
  selectCurrentOrder,
  (state) => state.selectedFlightBack
);
