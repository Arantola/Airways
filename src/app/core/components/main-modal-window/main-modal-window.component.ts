import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { transformMenu } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AIRPORTS } from 'src/app/admin/airports';
import {
  appSettingsActions,
  bookingActions,
} from 'src/app/redux/actions/app.actions';
import {
  BOOKING_PAGES,
  PASSENGERS_LIST,
} from 'src/app/shared/constants/constants';
import { Airport } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-main-modal-window',
  templateUrl: './main-modal-window.component.html',
  styleUrls: ['./main-modal-window.component.scss'],
})
export class MainModalWindowComponent implements OnInit, OnDestroy {
  initialForm!: FormGroup;

  isRounded: boolean = true;

  readonly passengersList = PASSENGERS_LIST;

  passengersDisplay: string = '1 Adult';

  isPassengersMenuOpened: boolean = false;

  airports: Airport[] = AIRPORTS;

  constructor(
    private store: Store,
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
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'main' }));
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
      isRounded: new FormControl(true),
      departurePoint: new FormControl(''),
      destinationPoint: new FormControl(''),
      date: new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      }),
      singleDate: new FormControl<Date | null>(null),
      passengersCompound: new FormGroup({
        adults: new FormControl(1),
        children: new FormControl(0),
        infants: new FormControl(0),
      }),
    });
  }

  private setPassengersDisplay(
    adults: number,
    children: number,
    infants: number
  ) {
    this.passengersDisplay = `
    ${adults > 1 ? `${adults} Adults` : '1 Adult'}${
      children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''
    }${infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}`;
  }

  private patchPassanges(form: FormGroup, field: string, value: number = 1) {
    this.initialForm.patchValue({
      passengersCompound: {
        [field]: form?.value[field] + value,
      },
    });
  }

  onRadioChange() {
    this.isRounded = !this.isRounded;
  }

  onTogglePassengerMenu() {
    this.isPassengersMenuOpened = !this.isPassengersMenuOpened;
  }

  onClickSwitch() {
    const departureValue = this.initialForm.get('departurePoint')?.value;
    const destinationValue = this.initialForm.get('destinationPoint')?.value;
    this.initialForm.get('departurePoint')?.setValue(destinationValue);
    this.initialForm.get('destinationPoint')?.setValue(departureValue);
  }

  onSubmit() {
    this.store.dispatch(
      bookingActions.updateFirstForm({ currentOrder: this.initialForm.value })
    );
    this.router.navigate(['booking', BOOKING_PAGES[0]]);
  }

  getColor(type: string) {
    return this.initialForm.get('passengersCompound')?.value[type]
      ? '#11397E'
      : '#1C1B1F';
  }

  onChangeNumber(fieldName: string, operation: string) {
    const form = <FormGroup>this.initialForm.get('passengersCompound');
    if (operation === 'plus' && form?.value[fieldName] < 10) {
      this.patchPassanges(form, fieldName, 1);
    }
    if (operation === 'minus') {
      if (fieldName === 'adults' && form?.value[fieldName] > 1) {
        this.patchPassanges(form, fieldName, -1);
      } else if (fieldName !== 'adults' && form?.value[fieldName] > 0) {
        this.patchPassanges(form, fieldName, -1);
      }
    }

    this.setPassengersDisplay(
      form?.value.adults,
      form?.value.children,
      form?.value.infants
    );
  }
}
