interface AppSettings {
  dateFormat: string;
  currency: string;
  currentPage: string;
  userName: string;
}

interface saveTicketData {
  flight: Flight;
  isWayBack: boolean;
  finishTime: string;
}

interface CurrentOrder {
  isRounded: boolean;
  departurePoint?: Airport;
  destinationPoint?: Airport;
  singleDate: Date | string | undefined;
  date: {
    start: Date | string | undefined;
    end: Date | string | undefined;
  };
  passengersCompound: PassengersCompound;
  selectedFlightFrom?: Ticket,
  selectedFlightBack?: Ticket,
  passengersInfo?: Passenger[];
  contacts?: Contacts;
  totalCost: number;
  paid: boolean;
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
  baggage: boolean;
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

interface Ticket {
  flight?: Flight;
  finishTime?: string;
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

interface UserOrder {
  [key: string]: CurrentOrder;
}

interface DateCard {
  date: Date;
  price: number;
  locale: string;
  currency: string;
  seats: number;
}

interface Prices {
  adultPrice: number;
  adultFare: number;
  adultTax: number;
  childPrice: number;
  childFare: number;
  childTax: number;
  infantPrice: number;
  infantFare: number;
  infantTax: number;
}

interface DialogData {
  type: string;
}

interface DateFormat {
  parse: {
    dateInput:  string[] | string,
  },
  display: {
    dateInput: string,
    monthYearLabel: string,
    dateA11yLabel: string,
    monthYearA11yLabel: string,
  }
};

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
  DateCard,
  Ticket,
  DialogData,
  saveTicketData,
  UserOrder,
  Prices,
  DateFormat,
};
