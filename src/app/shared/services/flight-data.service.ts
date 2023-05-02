import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../interfaces/interfaces';
import { getDatabase, ref, push, set } from 'firebase/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, map, Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  flightsByIATA: any[] = [];

  constructor(private http: HttpClient) {}

  addFlight(flight: Flight) {
    return this.http
      .post(
        'https://airways-c7c03-default-rtdb.firebaseio.com/flights.json',
        flight
      )
      .subscribe((response) => console.log(response));
  }

  getFlightsByIATA(iata: string) {
    this.flightsByIATA = [];
    this.http
      .get('https://airways-c7c03-default-rtdb.firebaseio.com/flights.json')
      .pipe(
        map((flights) => {
          for (let value of Object.values(flights)) {
            if (value.departurePoint.iata === iata) {
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

  private errorHandler(error: Error) {
    console.log(error);
  }
}
