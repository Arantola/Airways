import { createActionGroup, props } from '@ngrx/store';
import {
  Airport,
  Contacts,
  CurrentOrder,
  Passenger,
  Ticket,
} from 'src/app/shared/interfaces/interfaces';

export const appSettingsActions = createActionGroup({
  source: 'Header',
  events: {
    'Change Date Format': props<{ dateFormat: string }>(),
    'Change Currency': props<{ currency: string }>(),
    'Change Page': props<{ currentPage: string }>(),
  },
});

export const bookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Update First Form': props<{ currentOrder: CurrentOrder }>(),
    'Update Flight Info': props<{ currency: string }>(),
    'Update Passengers Info': props<{ passengersInfo: Passenger[] }>(),
    'Update Contacts': props<{ contacts: Contacts }>(),
    'Get Passengers Compound': props<{ contacts: Contacts }>(),
    'Update Flight From': props<{ flightFrom: Ticket | undefined }>(),
    'Update Flight Back': props<{ flightBack: Ticket | undefined }>(),
  },
});

export const bookingAPIActions = createActionGroup({
  source: 'Booking API',
  events: {
    'Update Search Result': props<{ searchResult: Airport[] }>(),
  },
});
