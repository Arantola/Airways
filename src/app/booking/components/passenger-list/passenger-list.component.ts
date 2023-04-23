import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControlValueAccessorAdapter } from './form-control-value-accessor-adapter';

interface PassengerInfo {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  birthday: Date | string;
  assistance: boolean;
}

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
  passengersList = ['audit', 'child', 'infant'];

  formGroup = new FormGroup({
    passengers: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    super();
    this.matIconRegistry.addSvgIcon(
      'wheelchair',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/wheelchair.svg'
      )
    );
  }

  ngOnInit() {
    this.addPassengerForms();
  }

  get passengers() {
    return this.formGroup.controls['passengers'] as FormArray;
  }

  private addPassengerForms() {
    for (const passanger of this.passengersList) {
      const passengerForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        gender: new FormControl<'male' | 'female'>('male'),
        birthday: new FormControl(), // TODO add check birthday and passengerType accordance
        assistance: new FormControl<boolean>(false),
      });
      this.passengers.push(passengerForm);
    }
  }
}
