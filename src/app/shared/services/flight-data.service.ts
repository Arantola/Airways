import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseFlight, Flight } from '../interfaces/interfaces';
import { FIREBASE_FLIGHTS } from '../constants/constants';
import { map, Observable, tap } from 'rxjs';

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

  getFlightsByIATA(departureIata: string, destinationIata: string): Observable<Flight[]> {
    return this.http
      .get('https://airways-c7c03-default-rtdb.firebaseio.com/flights.json')
      .pipe(
        tap((flights) => console.log(flights)),
        map((flights) => {
          this.flightsByIATA = [];
          for (let value of Object.values(flights)) {
            console.log(value.departurePoint.iata, value.destinationPoint.iata)
            if (
              value.departurePoint.iata === departureIata &&
              value.destinationPoint.iata === destinationIata
            ) {
              this.flightsByIATA.push(value);
            }
          }

          return this.flightsByIATA;
        })
      );
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
