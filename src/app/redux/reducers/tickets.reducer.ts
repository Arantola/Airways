import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Ticket } from 'src/app/shared/interfaces/interfaces';
import { bookingActions } from '../actions/app.actions';
import { createReducer, on } from '@ngrx/store';

export type TicketsState = EntityState<Ticket>;

export const ticketsAdapter = createEntityAdapter<Ticket>({
  selectId(ticket) {
    return ticket.flightNumber
  }
});

export const ticketsInitialState: TicketsState = ticketsAdapter.getInitialState();

export const ticketsReducer = createReducer(
  ticketsInitialState,
  on(bookingActions.selectedTicket, (state, { ticket }) => {
    return ticketsAdapter.addOne(ticket, state);
  }),
  on(bookingActions.deletedTicket, (state, { id }) => {
    return ticketsAdapter.removeOne(id, state);
  }),
);