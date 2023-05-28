import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  selectCurrentOrder,
  selectPassengersCompound,
  selectSettingsState,
} from 'src/app/redux/selectors/app.selectors';
import {
  CurrentOrder,
  DateFormat,
  PassengersCompound,
} from 'src/app/shared/interfaces/interfaces';
import { FormControlValueAccessorAdapter } from '../../../shared/adapters/form-control-value-accessor-adapter';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PassengerListComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PassengerListComponent,
      multi: true,
    },
  ],
})
export class PassengerListComponent
  extends FormControlValueAccessorAdapter
  implements OnInit, OnDestroy
{
  private subscriptionCurrentOrder!: Subscription;
  currentOrder!: CurrentOrder;
  passengersArray!: string[];
  formGroup!: FormGroup;
  currentDate: Date;

  public settings$ = this.store.select(selectSettingsState);
  private settingsSubscription?: Subscription;
  dateFormat = 'MM/DD/YYYY';

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private _adapter: DateAdapter<Date>,
    @Inject(MAT_DATE_FORMATS) private _formats: DateFormat,
    ) {
    super();
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToCurrentOrder();
    this.getPassengersArray();
    this.addPassengerForms();
    this.prefillForm();
    this.settingsSubscription = this.settings$.subscribe(
      (settings) => {
        this.dateFormat = settings.dateFormat;
        this._formats.parse.dateInput = settings.dateFormat;
        this._formats.display.dateInput = settings.dateFormat;
        this._adapter.setLocale('en');
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptionCurrentOrder.unsubscribe();
    this.settingsSubscription?.unsubscribe();
  }

  private initForm() {
    this.formGroup = new FormGroup({
      passengers: this.fb.array([]),
    });
  }

  private subscribeToCurrentOrder() {
    this.subscriptionCurrentOrder = this.store
      .select(selectCurrentOrder)
      .subscribe((currentOrder) => {
        this.currentOrder = currentOrder;
      });
  }

  private getPassengersArray() {
    this.store.select(selectPassengersCompound).subscribe((compound) => {
      this.passengersArray = this.transformObjectToArray(compound);
    });
  }

  private transformObjectToArray(compound: PassengersCompound) {
    const passengers = [];
    for (let [key, value] of Object.entries(compound)) {
      for (let i = 0; i < value; i++) {
        switch (key) {
          case 'adults':
            passengers.push('adult');
            break;
          case 'children':
            passengers.push('child');
            break;
          case 'infants':
            passengers.push('infant');
            break;
        }
      }
    }
    return passengers;
  }

  private addPassengerForms() {
    while (this.passengersFormArray.length < this.passengersArray.length) {
      const passengerForm = new FormGroup({
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        gender: new FormControl<'male' | 'female'>('male'),
        birthday: new FormControl('', [
          Validators.required,
          this.dateValidator,
        ]),
        assistance: new FormControl<boolean>(false),
        baggage: new FormControl<boolean>(false),
      });
      this.passengersFormArray.push(passengerForm);
    }
  }

  private prefillForm() {
    this.formGroup.patchValue({
      passengers: this.currentOrder.passengersInfo,
    });
  }

  private dateValidator(control: FormControl): { [s: string]: boolean } | null {
    const creationDate = new Date(control.value);
    const nowDate = new Date();
    if (creationDate > nowDate) {
      return { futureDate: true };
    }
    return null;
  }

  get passengersFormArray() {
    return this.formGroup.controls['passengers'] as FormArray;
  }

  getMaxDate(type: string) {
    let date = new Date();
    switch (type) {
      case 'adult':
        date.setFullYear(date.getFullYear() - 14);
        return date;
      case 'child':
        date.setFullYear(date.getFullYear() - 2);
        return date;
      default:
        return date;
    }
  }

  getMinDate(type: string) {
    let date = new Date();
    switch (type) {
      case 'child':
        date.setFullYear(date.getFullYear() - 14);
        return date;
      case 'infant':
        date.setFullYear(date.getFullYear() - 2);
        return date;
      default:
        return null;
    }
  }
}
