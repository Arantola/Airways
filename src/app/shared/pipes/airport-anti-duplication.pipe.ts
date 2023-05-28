import { Pipe, PipeTransform } from '@angular/core';
import { Airport } from '../interfaces/interfaces';

@Pipe({
  name: 'airportAntiDuplication',
  pure: false,
})
export class AirportAntiDuplicationPipe implements PipeTransform {
  transform(airports: Airport[], selectedAirport: Airport): Airport[] {
    if (airports && selectedAirport) {
      return airports.filter(
        (selected) => selected.iata !== selectedAirport.iata
      );
    }
    return airports;
  }
}
