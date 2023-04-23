import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-passengers-page',
  templateUrl: './passengers-page.component.html',
  styleUrls: ['./passengers-page.component.scss'],
})
export class PassengersPageComponent implements OnInit {
  passengersForm!: FormGroup;
  selectedValue!: string;

  constructor(
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
      // contactsForm: new FormGroup({
      // phone: new FormGroup({
      // country: new FormControl(),
      // number: new FormControl(),
      // }),
      // email: new FormControl<string>(''),
      // })
    });
  }

  submitForm() {
    console.log(this.passengersForm);
  }
}
