import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatEndDate } from '@angular/material/datepicker';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  initialForm!: FormGroup;

  passengersList = ['Adults', 'Child', 'Infant'];

  passangers = {
    adults: 1,
    child: 0,
    infant: 0,
  };
  // TODO replace mock data with data from api request
  places = [
    {
      city: 'Amsterdam',
      iata: 'AMS',
      airport: 'Dyce',
      country: 'United Kingdom',
    },
    {
      city: 'Baku',
      iata: 'GYD',
      airport: 'Heydar Aliyev',
      country: 'Azerbaijan',
    },
  ];

  isRounded: boolean = true;

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.initialForm = new FormGroup({
      type: new FormControl('rounded'),
      from: new FormControl(''),
      destination: new FormControl(''),
      date: new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      }),
      singleDate: new FormControl<Date | null>(null),
      passangers: new FormGroup({
        adults: new FormControl(1),
        child: new FormControl(0),
        infant: new FormControl(0),
      }),
    });
  }

  onRadioChange() {
    this.isRounded = !this.isRounded;
  }

  onClickSwitch() {
    const fromCurrentValue = this.initialForm.get('from')?.value;
    const destinationCurrentValue = this.initialForm.get('destination')?.value;
    this.initialForm.get('from')?.setValue(destinationCurrentValue);
    this.initialForm.get('destination')?.setValue(fromCurrentValue);
  }

  onSubmit() {
    console.log(this.initialForm);
  }
}
