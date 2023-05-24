const DATE_FORMATS = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'];

const CURRENCIES = ['EUR', 'USA', 'RUB', 'PLN'];

enum CurrencySymbols {
  EUR = '€',
  USA = '$',
  RUB = '₽',
  PLN = 'zł',
}

const PASSENGERS_LIST = [
  { type: 'adults', age: '14+ years'},
  { type: 'children', age: '2-14 years'},
  { type: 'infants', age: '0-2 years'},
];

const BOOKING_PAGES = ['flight-selection', 'passengers', 'summary'];

const FIREBASE_ORIGIN = `https://airways-c7c03-default-rtdb.firebaseio.com/`;
const FIREBASE_FLIGHTS = `${FIREBASE_ORIGIN}flights.json`;
const FIREBASE_ORDERS = `${FIREBASE_ORIGIN}orders`;

const CART_COLUMNS = [
  'no',
  'flight',
  'typeTrip',
  'dataTime',
  'passengers',
  'price',
];

const EXCHANGE_RATE = 'https://www.cbr-xml-daily.ru/daily_json.js';

export {
  DATE_FORMATS,
  CURRENCIES,
  PASSENGERS_LIST,
  BOOKING_PAGES,
  CART_COLUMNS,
  FIREBASE_FLIGHTS,
  FIREBASE_ORDERS,
  CurrencySymbols,
  EXCHANGE_RATE,
};
