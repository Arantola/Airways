import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPassengersCompound } from 'src/app/redux/selectors/app.selectors';
import { PassengersCompound } from 'src/app/shared/interfaces/interfaces';
import { IconService } from 'src/app/shared/services/icon.service';
import { FormControlValueAccessorAdapter } from './form-control-value-accessor-adapter';

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
  implements OnInit
{
  passengersArray!: string[];

  formGroup!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private iconService: IconService
  ) {
    super();
    this.iconService.addPath('wheelchair', 'assets/icons/wheelchair.svg');
  }

  ngOnInit() {
    this.initForm();
    this.getPassengersArray();
    this.addPassengerForms();
  }

  private initForm() {
    this.formGroup = new FormGroup({
      passengers: this.fb.array([]),
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
        passengers.push(key);
      }
    }
    return passengers;
  }

  private addPassengerForms() {
    while (this.passengersFormArray.length < this.passengersArray.length) {
      const passengerForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        gender: new FormControl<'male' | 'female'>('male'),
        birthday: new FormControl(), // TODO add check birthday and passengerType accordance
        assistance: new FormControl<boolean>(false),
      });
      this.passengersFormArray.push(passengerForm);
    }
  }

  get passengersFormArray() {
    return this.formGroup.controls['passengers'] as FormArray;
  }
}
