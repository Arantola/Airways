import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
import { AIRPORTS } from '../../../shared/constants/airports';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';
import { FlightsGeneratorService } from './flights-generator';
import { UserOrdersService } from 'src/app/shared/services/user-orders.service';
import { CurrentOrder, UserOrder } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  flightForm!: FormGroup;
  airports = AIRPORTS;
  departureIata: string = '';
  destinationIata: string = '';

  constructor(
    private flightService: FlightDataService,
    private store: Store,
    private generator: FlightsGeneratorService,
    private orders: UserOrdersService
  ) {}

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
      availableTickets: new FormControl(''),
    });
  }

  getValue(value: string) {
    return this.flightForm.get(`${value}`)?.value;
  }

  onAddFlight() {
    this.flightService.addFlight(this.flightForm.value);
  }

  onGetFlightByIATA() {
    this.flightService.getFlightsByIATA(
      this.departureIata,
      this.destinationIata
    );
  }

  onGetFlights() {
    this.flightService.getAllFlights();
  }

  onGenerateFlights() {
    this.generator.generateFlights(this.airports, 40);
  }

  onDeleteFlights() {
    this.flightService.resetDB();
  }

  onGetAllOrders() {
    this.orders.getAllOrders();
  }

  onOverwriteOrder() {
    this.orders.overwriteOrder({
      ['-NVubvd-fFCXtwrkHHeA' as keyof UserOrder]: {} as CurrentOrder,
    } as UserOrder);
  }

  onDeleteOrder() {
    this.orders.deleteOrder('-NVubvd-fFCXtwrkHHeA');
  }
}
