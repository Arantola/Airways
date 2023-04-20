import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  initialForm!: FormGroup;

  isRounded: boolean = true;

  passengersList = [
    ['adults', '14+ years'],
    ['child', '2-14 years'],
    ['infant', '0-2 years'],
  ];

  passengersDisplay: string = '1 Adult';

  isPassangersMenuOpened: boolean = false;
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

  constructor() {}

  ngOnInit() {
    this.initForm();
    window.addEventListener('click', (e: Event) =>
      this.passangerFocusHandler(e)
    );
  }

  ngOnDestroy() {
    //TODO Check removing listener. If it not removed change to onclick method and delete with "= null"
    window.removeEventListener('click', (e: Event) =>
      this.passangerFocusHandler(e)
    );
  }

  private passangerFocusHandler(e: Event) {
    const target = (<HTMLElement>e.target).closest('.passengers__form');
    this.isPassangersMenuOpened = Boolean(target);
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

  private setPassangersDisplay(adults: number, child: number, infant: number) {
    this.passengersDisplay = `
    ${adults > 1 ? `${adults} Adults` : '1 Adult'}${
      child > 0 ? `, ${child} Child${child > 1 ? 'ren' : ''}` : ''
    }${infant > 0 ? `, ${infant} Infant${infant > 1 ? 's' : ''}` : ''}`;
  }

  private patchPassanges(form: FormGroup, field: string, value: number = 1) {
    this.initialForm.patchValue({
      passangers: {
        [field]: form?.value[field] + value,
      },
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
    // TODO add dato to store
    console.log(this.initialForm);
  }

  togglePassangerMenu() {
    this.isPassangersMenuOpened = !this.isPassangersMenuOpened;
  }

  getColor(type: string) {
    return this.initialForm.get('passangers')?.value[type]
      ? '#11397E'
      : '#1C1B1F';
  }

  onChangeNumber(fieldName: string, operation: string) {
    const form = <FormGroup>this.initialForm.get('passangers');
    if (operation === 'plus' && form?.value[fieldName] < 10) {
      this.patchPassanges(form, fieldName, 1);
    }
    if (operation === 'minus') {
      if (fieldName === 'adults' && form?.value[fieldName] > 1) {
        this.patchPassanges(form, fieldName, -1);
      } else if (form?.value[fieldName] > 0) {
        this.patchPassanges(form, fieldName, -1);
      }
    }

    this.setPassangersDisplay(
      form?.value.adults,
      form?.value.child,
      form?.value.infant
    );
  }
}
