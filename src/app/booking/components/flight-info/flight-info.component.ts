import { Component, Input, OnInit } from '@angular/core';
import { CurrentOrder, Ticket } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent implements OnInit {
  @Input() currentOrder!: CurrentOrder;
  @Input() flightInfo!: Ticket;
  numberSeats!: Array<string>;

  ngOnInit(): void {
    this.getRandomSeats();
  }

  get finishTime() {
    return this.flightInfo.finishTime;
  }

  get flight() {
    return this.flightInfo.flight!;
  }

  getRandomSeats(): void {
    const result = [];
    const seatChar = ['A', 'B', 'C', 'D', 'E', 'F'];
    const minValueRow = 5;
    const maxValueRow = 20;
    const numberOfPassengers =
      this.currentOrder.passengersCompound.adults +
      this.currentOrder.passengersCompound.children;
    let rowNumber = Math.round(
      Math.random() * (maxValueRow - minValueRow) + minValueRow
    );
    let indexChar = Math.round(Math.random() * (seatChar.length - 1));
    for (let i = 0; i < numberOfPassengers; i++) {
      if (indexChar > 5) {
        indexChar = 0;
        rowNumber++;
      }
      let seat = String(rowNumber) + seatChar[indexChar];
      indexChar++;
      result.push(seat);
    }
    this.numberSeats = result;
  }
}
