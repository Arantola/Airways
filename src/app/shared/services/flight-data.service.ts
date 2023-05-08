import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseFlight, Flight } from '../interfaces/interfaces';
import { map } from 'rxjs';
import { FIREBASE_FLIGHTS } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  flightsByIATA: Flight[] = [];

  constructor(private http: HttpClient) {}

  addFlight(flight: Flight) {
    return this.http
      .post<FirebaseFlight>(FIREBASE_FLIGHTS, flight)
      .subscribe((response) => console.log(response));
  }

  resetDB() {
    return this.http
      .put<FirebaseFlight>(FIREBASE_FLIGHTS, {})
      .subscribe((response) => console.log(response));
  }

  getFlightsByIATA(departureIata: string, destinationIata: string) {
    return this.http
      .get<FirebaseFlight>(FIREBASE_FLIGHTS)
      .pipe(
        map((flights) => {
          this.flightsByIATA = [];
          for (let value of Object.values(flights)) {
            if (
              value.departurePoint.iata === departureIata &&
              value.destinationPoint.iata === destinationIata
            ) {
              this.flightsByIATA.push(value);
            }
          }
          return this.flightsByIATA;
        })
      )
      .subscribe((data) => console.log(data));
  }

  getAllFlights() {
    this.http
      .get<FirebaseFlight>(FIREBASE_FLIGHTS)
      .subscribe((response) => console.log(response));
  }

  private errorHandler(error: Error) {
    console.log(error);
  }
}
