import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import nationalities from 'src/app/shared/constants/nationalities.json';
import phoneCode from 'src/app/shared/constants/CountryCodes.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  citizenshipsData = nationalities;
  countryCodeData = phoneCode;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      'userEmail': ['', [Validators.required, Validators.email]],
      'userPassword': ['', Validators.required],
      'userFirstName': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'userLastName': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'userBirthday': ['', [Validators.required, this.dateValidator]],
      'userGender': [''],
      'countryCode': [''],
      'phoneNumber': ['', [Validators.required, Validators.pattern(/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/)]],
      'nationalities': [''],
    })
  }

  dateValidator(control: FormControl): { [s: string]: boolean } | null {
    const creationDate = new Date(control.value);
    const nowDate = new Date();
    if (creationDate > nowDate) {
      return { futureDate: true };
    }
    return null;
  }

}
