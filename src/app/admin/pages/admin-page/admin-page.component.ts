import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
import { Airport, Flight } from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';
import { AIRPORTS } from '../../airports';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  flightForm!: FormGroup;
  airports = AIRPORTS;
  iata: string = '';

  constructor(private flightService: FlightDataService, private store: Store) {}

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: 'admin' })
    );
  }

  private initForm() {
    this.flightForm = new FormGroup({
      id: new FormControl(''),
      departurePoint: new FormControl(),
      destinationPoint: new FormControl(''),
      date: new FormControl(),
      startTime: new FormControl(),
      travelTime: new FormControl(''),
      price: new FormControl(''),
      avalibleTickets: new FormControl(''),
    });
  }

  getValue(value: string) {
    return this.flightForm.get(`${value}`)?.value;
  }

  onAddFlight() {
    this.flightService.addFlight(this.flightForm.value);
  }

  onGetFlightByIATA() {
    console.log('ByIATA: ', this.flightService.getFlightsByIATA(this.iata));
  }

  onGetFlights() {
    this.flightService.getAllFlights();
  }
}
