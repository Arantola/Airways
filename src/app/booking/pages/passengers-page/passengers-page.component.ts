import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  appSettingsActions,
  bookingActions,
} from 'src/app/redux/actions/app.actions';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import phoneCode from 'src/app/shared/constants/CountryCodes.json';
import { IconService } from 'src/app/shared/services/icon.service';

@Component({
  selector: 'app-passengers-page',
  templateUrl: './passengers-page.component.html',
  styleUrls: ['./passengers-page.component.scss'],
})
export class PassengersPageComponent implements OnInit {
  passengersForm!: FormGroup;
  countryCodeData = phoneCode;

  constructor(
    private store: Store,
    private router: Router,
    private iconService: IconService
  ) {
    this.iconService.addPath('account', 'assets/icons/account.svg');
    this.iconService.addPath('contact', 'assets/icons/contact.svg');
  }

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[1] })
    );
  }

  private initForm(): void {
    this.passengersForm = new FormGroup({
      passengersList: new FormControl(),
      contactsForm: new FormGroup({
        phone: new FormGroup({
          country: new FormControl(),
          number: new FormControl(),
        }),
        email: new FormControl<string>(''),
      }),
    });
  }

  get country() {
    return this.passengersForm.get('contactsForm.phone.country')?.value;
  }

  get passengersList() {
    return this.passengersForm.get('passengersList')?.value.passengers;
  }

  get contacts() {
    return this.passengersForm.get('contactsForm')?.value;
  }

  submitForm() {
    this.store.dispatch(
      bookingActions.updatePassengersInfo({
        passengersInfo: this.passengersList,
      })
    );
    this.store.dispatch(
      bookingActions.updateContacts({ contacts: this.contacts })
    );
    this.router.navigate(['booking', BOOKING_PAGES[2]]);
  }
}
