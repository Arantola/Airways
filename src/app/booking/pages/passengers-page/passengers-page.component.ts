import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import phoneCode from 'src/app/shared/constants/CountryCodes.json';

@Component({
  selector: 'app-passengers-page',
  templateUrl: './passengers-page.component.html',
  styleUrls: ['./passengers-page.component.scss'],
})
export class PassengersPageComponent implements OnInit {
  passengersForm!: FormGroup;
  countryCodeData = phoneCode;

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'account',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/account.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'contact',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/contact.svg'
      )
    );
  }

  ngOnInit(): void {
    this.initForm();
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

  submitForm() {
    console.log(this.passengersForm);
    this.router.navigate(['booking', 'summary']);
  }
}
