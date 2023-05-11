import { Component, Input } from '@angular/core';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.scss']
})
export class FlightFareComponent {
  @Input() flightInfo!: CurrentOrder;

}
