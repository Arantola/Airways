import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss'],
})
export class PassengerInfoComponent {
  @Input() index!: number;
  @Input() passengerType!: string;

  constructor() {}
}
