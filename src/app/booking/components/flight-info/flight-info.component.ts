import { Component, Input } from '@angular/core';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss']
})
export class FlightInfoComponent {
  @Input() flightInfo!: CurrentOrder;
  flightInf = {
    numberFlight: 'FR 1925',
    departure: 'Dublin',
    arrival: 'Warsaw Modlin',
    date: 'Wednesday, 1 March, 2023',
    departureTime: '8:40',
    arrivalTime: '12:00',
  }
}
