import { Injectable } from '@angular/core';
import { Airport } from 'src/app/shared/interfaces/interfaces';
import { FlightDataService } from 'src/app/shared/services/flight-data.service';

@Injectable({
  providedIn: 'root',
})
export class FlightsGeneratorService {
  constructor(private fs: FlightDataService) {}

  public generateFlights(airports: Airport[], quantity: number) {
    for (const departure of airports) {
      for (const destination of airports) {
        const unicDates = this.formDatesArray(quantity);
        for (const unicDate of unicDates) {
          const flight = this.formFlight(departure, destination, unicDate);
          this.fs.addFlight(flight);
        }
      }
    }
  }

  private formFlight(from: Airport, to: Airport, date: string) {
    return {
      id: this.getRandomId(),
      departurePoint: from,
      destinationPoint: to,
      date: date,
      startTime: this.getStartTime(),
      travelTime: this.getTravelTime(),
      price: this.getNumber(20, 301),
      availableTickets: this.getNumber(1, 101),
    };
  }

  private formDatesArray(quantity: number) {
    const datesArray = [];
    for (let i = 0; i < quantity; i++) {
      datesArray.push(this.getDate());
    }
    return Array.from(new Set(datesArray));
  }

  private getRandomId() {
    let result = `${this.getRandomCharacter()}${this.getRandomCharacter()}`;
    result += Math.round(this.getNumber(1000, 9999));
    return result;
  }

  private getRandomCharacter(characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  private getTravelTime() {
    const hours = this.getNumber(0, 3);
    let minutes = this.getMinutes();
    if (hours === 0 && minutes === '00') {
      minutes = '30';
    }
    return `${hours}:${minutes}`;
  }

  private getStartTime() {
    return `${this.getHours(24)}:${this.getMinutes()}`;
  }

  private getHours(max: number) {
    const number = Math.floor(Math.random() * max);
    return number < 10 ? `0${number}` : `${number}`;
  }

  private getMinutes() {
    const number = Math.floor(Math.random() * 6);
    return `${number}0`;
  }

  private getNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  private getDate() {
    const day = this.getNumber(1, 30);
    return '2023-05-' + `${day < 10 ? '0' + day : day}`;
  }
}
