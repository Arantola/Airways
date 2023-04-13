import { Component } from '@angular/core';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent {
  isEditMode: boolean = false;

  flightInfo = {
    // TODO make flightInfo interface
    from: 'Dublin',
    destination: 'Warsaw Modlin',
    dates: {
      boardingThere: '1 Mar',
      arrivalThere: '1 Mar',
      boardingBack: '18 Mar',
      arrivalBack: '18 Mar',
    },
    passengers: [
      {
        type: 'adult',
        firstName: 'Harry',
        secondName: 'Potter',
        sex: 'male',
        birthday: 'date',
      },
      {
        type: 'child ',
        firstName: 'Lily',
        secondName: 'Potter',
        sex: 'female',
        birthday: 'date',
      },
      {
        type: 'infant ',
        firstName: 'James',
        secondName: 'Potter',
        sex: 'male',
        birthday: 'date',
      },
    ],
  };

  onToggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
}
