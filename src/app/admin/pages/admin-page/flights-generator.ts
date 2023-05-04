import { Injectable } from '@angular/core';
import { Airport } from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';

@Injectable({
  providedIn: 'root',
})
export class FlightsGeneratorService {
  constructor(private fs: FlightDataService) {}

  public generateFlights(airports: Airport[]) {
    for (const departure of airports) {
      for (const destination of airports) {
        const unicDates = Array.from(new Set(this.formDatesArray(4)));
        for (const unicDate of unicDates) {
          const flight = this.formFlight(departure, destination, unicDate);
          this.fs.addFlight(flight);
        }
      }
    }
  }

  private formFlight(from: Airport, to: Airport, date: string) {
    return {
      id: `${this.getRandomId()}`,
      departurePoint: from,
      destinationPoint: to,
      date: `${date}`,
      startTime: `${this.getRandomHours(24)}:${this.getRandomMinutes()}`,
      travelTime: `${this.getTravelTime()}`,
      price: this.getRandomNumber(20, 300),
      avalibleTickets: this.getRandomNumber(1, 101),
    };
  }

  private formDatesArray(quantity: number) {
    const datesArray = [];
    for (let i = 0; i < quantity; i++) {
      datesArray.push(this.getRandomDate());
    }
    return datesArray;
  }

  private getRandomId() {
    let result = `${this.getRandomCharacter()}${this.getRandomCharacter()}`;
    result += Math.round(this.getRandomNumber(1000, 10000));
    return result;
  }

  private getRandomCharacter(characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  private getTravelTime() {
    const hours = this.getRandomHours(3);
    let minutes = this.getRandomMinutes();
    if (hours === '00' && minutes === '00') {
      minutes = '30';
    }
    return `${hours}:${minutes}`;
  }

  private getRandomHours(max: number) {
    const number = Math.floor(Math.random() * max);
    return number < 10 ? `0${number}` : `${number}`;
  }

  private getRandomMinutes() {
    const number = Math.floor(Math.random() * 6);
    return `${number}0`;
  }

  private getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  private getRandomDate() {
    return `${'2023-05-0' + this.getRandomNumber(0, 8)}`;
  }
}
