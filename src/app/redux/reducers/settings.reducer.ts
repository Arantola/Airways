import { createReducer, on } from '@ngrx/store';
import { AppSettings } from 'src/app/shared/interfaces/interfaces';
import { appSettingsActions } from '../actions/app.actions';

export const appSettingsState: AppSettings = {
  dateFormat: 'MM/DD/YYYY',
  currency: 'EUR',
  currentPage: 'main',
  userName: '',
};

export const appSettingsReducer = createReducer(
  appSettingsState,
  on(appSettingsActions.changeDateFormat, (state, { dateFormat }) => ({
    ...state,
    dateFormat: dateFormat,
  })),
  on(appSettingsActions.changeCurrency, (state, { currency }) => ({
    ...state,
    currency: currency,
  })),
  on(appSettingsActions.changePage, (state, { currentPage }) => ({
    ...state,
    currentPage: currentPage,
  })),
  on(appSettingsActions.setUserName, (state, { userName }) => ({
    ...state,
    userName: userName,
  }))
);
