import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseFlight, Flight } from '../interfaces/interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  flightsByIATA: Flight[] = [];

  constructor(private http: HttpClient) {}

  addFlight(flight: Flight) {
    return this.http
      .post<FirebaseFlight>(
        'https://airways-c7c03-default-rtdb.firebaseio.com/flights.json',
        flight
      )
      .subscribe((response) => console.log(response));
  }

  resetDB() {
    return this.http
      .put<FirebaseFlight>(
        'https://airways-c7c03-default-rtdb.firebaseio.com/flights.json',
        {}
      )
      .subscribe((response) => console.log(response));
  }

  getFlightsByIATA(departureIata: string, destinationIata: string) {
    this.flightsByIATA = [];
    this.http
      .get<FirebaseFlight>(
        'https://airways-c7c03-default-rtdb.firebaseio.com/flights.json'
      )
      .pipe(
        map((flights) => {
          for (let value of Object.values(flights)) {
            if (
              value.departurePoint.iata === departureIata &&
              value.destinationPoint.iata === destinationIata
            ) {
              this.flightsByIATA.push(value);
            }
          }
        })
      )
      .subscribe();
    return this.flightsByIATA;
  }

  getAllFlights() {
    this.http
      .get('https://airways-c7c03-default-rtdb.firebaseio.com/flights.json')
      .subscribe((response) => console.log(response));
  }

  getWeeklyArray() {
    const weeklyArray: Array<Array<Flight>> = [[], [], [], [], [], [], [], []];
    for (let flight of this.flightsByIATA) {
      const day = Number(flight.date.charAt(9));
      weeklyArray[day - 1].push(flight);
    }
    return weeklyArray;
  }

  private errorHandler(error: Error) {
    console.log(error);
  }
}
