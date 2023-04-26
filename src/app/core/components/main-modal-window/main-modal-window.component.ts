import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-modal-window',
  templateUrl: './main-modal-window.component.html',
  styleUrls: ['./main-modal-window.component.scss'],
})
export class MainModalWindowComponent implements OnInit, OnDestroy {
  initialForm!: FormGroup;

  isRounded: boolean = true;

  passengersList = [
    ['adults', '14+ years'],
    ['child', '2-14 years'],
    ['infant', '0-2 years'],
  ];

  passengersDisplay: string = '1 Adult';

  isPassengersMenuOpened: boolean = false;
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

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'switch',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/switch.svg'
      )
    );
  }

  ngOnInit() {
    this.initForm();
    window.addEventListener('click', (e: Event) =>
      this.passengerFocusHandler(e)
    );
  }

  ngOnDestroy() {
    //TODO Check removing listener. If it not removed change to onclick method and delete with "= null"
    window.removeEventListener('click', (e: Event) =>
      this.passengerFocusHandler(e)
    );
  }

  private passengerFocusHandler(e: Event) {
    const target = (<HTMLElement>e.target).closest('.passengers__form');
    this.isPassengersMenuOpened = Boolean(target);
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
      passengers: new FormGroup({
        adults: new FormControl(1),
        child: new FormControl(0),
        infant: new FormControl(0),
      }),
    });
  }

  private setPassengersDisplay(adults: number, child: number, infant: number) {
    this.passengersDisplay = `
    ${adults > 1 ? `${adults} Adults` : '1 Adult'}${
      child > 0 ? `, ${child} Child${child > 1 ? 'ren' : ''}` : ''
    }${infant > 0 ? `, ${infant} Infant${infant > 1 ? 's' : ''}` : ''}`;
  }

  private patchPassanges(form: FormGroup, field: string, value: number = 1) {
    this.initialForm.patchValue({
      passengers: {
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
    this.router.navigate(['/passengers']);
  }

  togglePassengerMenu() {
    this.isPassengersMenuOpened = !this.isPassengersMenuOpened;
  }

  getColor(type: string) {
    return this.initialForm.get('passengers')?.value[type]
      ? '#11397E'
      : '#1C1B1F';
  }

  onChangeNumber(fieldName: string, operation: string) {
    const form = <FormGroup>this.initialForm.get('passengers');
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

    this.setPassengersDisplay(
      form?.value.adults,
      form?.value.child,
      form?.value.infant
    );
  }
}
