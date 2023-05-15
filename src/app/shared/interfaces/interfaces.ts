import { TicketsState } from 'src/app/redux/reducers/current-order.reducer';

interface AppSettings {
  dateFormat: string;
  currency: string;
  currentPage: string;
}

interface saveTicketData {
  flight: Flight;
  isWayBack: boolean;
  finishTime: string;
}

interface CurrentOrder {
  isRounded: boolean;
  departurePoint: Airport | undefined;
  destinationPoint: Airport | undefined;
  singleDate: Date | string | undefined;
  date: {
    start: Date | string | undefined;
    end: Date | string | undefined;
  };
  passengersCompound: PassengersCompound;
  tickets: TicketsState;
  passengersInfo?: Passenger[];
  contacts?: Contacts;
}

interface PassengersCompound {
  adults: number;
  children: number;
  infants: number;
}

interface Passenger {
  assistance: boolean;
  birthday: Date | string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
}

interface Flight {
  id: string;
  date: string;
  departurePoint: Airport;
  destinationPoint: Airport;
  startTime: string;
  travelTime: string;
  price: number;
  availableTickets: number;
}

interface PeriodicElement {
  no: string;
  flight: string[];
  typeTrip: string;
  dataTime: string[];
  passengers: PassengersCompound;
  price: number;
}

interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
  UTC: string;
}

interface Contacts {
  phone: {
    country: Country | undefined;
    number: string | undefined;
  };
  email: string | undefined;
}

interface Country {
  name: string;
  dial_code: string;
  code: string;
}

interface FirebaseFlight {
  [key: string]: Flight;
}

interface Ticket {
  isWayBack: boolean;
  date: string | undefined;
  startTime: string | undefined;
  finishTime: string | undefined;
  travelTime: string | undefined;
  departurePoint: Airport | undefined;
  destinationPoint: Airport | undefined;
  flightNumber: string;
  price: number | undefined;
}

interface DateCard {
  date: Date;
  price: number;
  locale: string;
  currency: string;
  seats: number;
}

export {
  AppSettings,
  CurrentOrder,
  PassengersCompound,
  Passenger,
  Flight,
  Airport,
  Contacts,
  Country,
  FirebaseFlight,
  PeriodicElement,
  DateCard,
  Ticket,
  saveTicketData
};
