import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  appSettingsActions,
  bookingActions,
} from 'src/app/redux/actions/app.actions';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import phoneCode from 'src/app/shared/constants/CountryCodes.json';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';
import { IconService } from 'src/app/shared/services/icon.service';

@Component({
  selector: 'app-passengers-page',
  templateUrl: './passengers-page.component.html',
  styleUrls: ['./passengers-page.component.scss'],
})
export class PassengersPageComponent implements OnInit, OnDestroy {
  readonly BOOKING_PAGES = BOOKING_PAGES;
  private subscriptionCurrentOrder!: Subscription;
  currentOrder!: CurrentOrder;

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
    this.subscribeToCurrentOrder();
    this.prefillForm();
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[1] })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionCurrentOrder.unsubscribe();
  }

  private initForm(): void {
    this.passengersForm = new FormGroup({
      passengersList: new FormControl(),
      contactsForm: new FormGroup({
        phone: new FormGroup({
          country: new FormControl('', [Validators.required]),
          number: new FormControl('', [Validators.required]),
        }),
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
      }),
    });
  }

  private subscribeToCurrentOrder() {
    this.subscriptionCurrentOrder = this.store
      .select(selectCurrentOrder)
      .subscribe((currentOrder) => {
        this.currentOrder = currentOrder;
      });
  }

  private prefillForm() {
    this.passengersForm.patchValue({
      contactsForm: {
        phone: {
          country: this.currentOrder.contacts?.phone.country,
          number: this.currentOrder.contacts?.phone.number,
        },
        email: this.currentOrder.contacts?.email,
      },
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
