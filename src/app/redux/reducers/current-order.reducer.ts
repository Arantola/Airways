import { createReducer, on } from '@ngrx/store';
import { CurrentOrder, Ticket } from 'src/app/shared/interfaces/interfaces';
import { bookingActions } from '../actions/app.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export type TicketsState = EntityState<Ticket>;

export const ticketsAdapter = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket.flightNumber
});

export const ticketsInitialState: TicketsState = ticketsAdapter.getInitialState();

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
  tickets: ticketsInitialState,
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
    ...state,
    ...currentOrder,
  })),
  on(bookingActions.updatePassengersInfo, (state, { passengersInfo }) => ({
    ...state,
    passengersInfo: passengersInfo,
  })),
  on(bookingActions.updateContacts, (state, { contacts }) => ({
    ...state,
    contacts: contacts,
  })),
  on(bookingActions.selectedTicket, (state, { ticket }) => ({
    ...state,
    tickets: ticketsAdapter.addOne(ticket, state.tickets),
  })),
  on(bookingActions.deletedTicket, (state, { id }) => ({
    ...state,
    tickets: ticketsAdapter.removeOne(id, state.tickets),
  })),
);
