import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Airport,
  Contacts,
  CurrentOrder,
  Passenger,
  Ticket,
  UserOrder,
} from 'src/app/shared/interfaces/interfaces';

export const appSettingsActions = createActionGroup({
  source: 'Header',
  events: {
    'Change Date Format': props<{ dateFormat: string }>(),
    'Change Currency': props<{ currency: string }>(),
    'Change Page': props<{ currentPage: string }>(),
    'Set User Name': props<{ userName: string }>(),
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
    'Add Total Cost': props<{ totalCost: number }>(),
  },
});

export const bookingAPIActions = createActionGroup({
  source: 'Booking API',
  events: {
    'Update Search Result': props<{ searchResult: Airport[] }>(),
  },
});

export const ordersActions = createActionGroup({
  source: 'Orders API',
  events: {
    'Load Orders': emptyProps(),
    'Complete Orders Load': props<{orders: UserOrder[] }>(),
    'Delete Order': props<{ id: string }>(),
    'Update Order': props<{ userOrder: UserOrder}>()
  }
})
