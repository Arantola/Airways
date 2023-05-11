import { createReducer, on } from '@ngrx/store';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';
import { bookingActions } from '../actions/app.actions';


const currentOrderState: CurrentOrder = {
  // main page
  isRounded: true,
  departurePoint: undefined,
  destinationPoint: undefined,
  singleDate: undefined,
  date: {
    start: undefined,
    end: undefined,
  },
  passengersCompound: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  // selected flight page
  selectedFlightFrom: undefined,
  selectedFlightBack: undefined,
  // passengers page
  passengersInfo: [],
  contacts: {
    phone: {
      country: undefined,
      number: undefined,
    },
    email: undefined,
  }
};

export const currentOrderReducer = createReducer(
  currentOrderState,
  on(bookingActions.updateFirstForm, (state, { currentOrder }) => ({
    ...currentOrder,
  })),
  on(bookingActions.updatePassengersInfo, (state, { passengersInfo }) => ({
    ...state,
    passengersInfo: passengersInfo,
  })),
  on(bookingActions.updateContacts, (state, { contacts }) => ({
    ...state,
    contacts: contacts,
  }))
);
