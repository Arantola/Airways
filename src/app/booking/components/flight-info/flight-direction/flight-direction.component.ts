import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-direction',
  templateUrl: './flight-direction.component.html',
  styleUrls: ['./flight-direction.component.scss']
})
export class FlightDirectionComponent {
  flightInfo = {
    numberFlight: 'FR 1925',
    departure: 'Dublin',
    arrival: 'Warsaw Modlin',
    date: 'Wednesday, 1 March, 2023',
    departureTime: '8:40',
    arrivalTime: '12:00',
  }

}
