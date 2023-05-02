interface AppSettings {
  dateFormat: string;
  currency: string;
  currentPage: string;
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
  selectedFlightFrom: Flight | undefined;
  selectedFlightBack: Flight | undefined;
  passengersInfo: Passenger[];
  contacts: Contacts;
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
  departurePoint: Airport;
  destinationPoint: Airport;
  startTime: Date | string | null;
  travelTime: number | string;
  price: number | string;
  avalibleTickets: number;
}

interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
  UTC: number | string;
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

export {
  AppSettings,
  CurrentOrder,
  PassengersCompound,
  Passenger,
  Flight,
  Airport,
  Contacts,
  Country,
};
