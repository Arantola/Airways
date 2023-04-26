import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import nationalities from 'src/app/shared/constants/nationalities.json';
import phoneCode from 'src/app/shared/constants/CountryCodes.json';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() userSignUp = new EventEmitter();
  signUpForm!: FormGroup;

  citizenshipsData = nationalities;
  countryCodeData = phoneCode;

  validPassword = `Please use:
    1) min 8 characters
    2) letters with upper and lower case
    3) at least one letter and one number
    4) one special char (! @ # ?)`;

  validName = "The field doesn't contain numbers";

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.signUpForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, this.passwordValidator]],
      userFirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      userLastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      userBirthday: ['', [Validators.required, this.dateValidator]],
      userGender: [''],
      countryCode: [''],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
          ),
        ],
      ],
      nationalities: [''],
    });
  }

  get userEmail() {
    return this.signUpForm.get('userEmail')?.value;
  }

  get userPassword() {
    return this.signUpForm.get('userPassword')?.value;
  }

  dateValidator(control: FormControl): { [s: string]: boolean } | null {
    const creationDate = new Date(control.value);
    const nowDate = new Date();
    if (creationDate > nowDate) {
      return { futureDate: true };
    }
    return null;
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } | null {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/;
    if (!regex.test(control.value)) {
      return { userPass: true };
    }
    return null;
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.authService.SignUp(this.userEmail, this.userPassword);
      this.userSignUp.emit(true);
      this.signUpForm.reset();
    }
  }
}
