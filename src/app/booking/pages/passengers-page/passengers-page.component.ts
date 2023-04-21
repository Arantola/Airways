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
  contactsForm!: FormGroup;
  selectedValue!: string;
  passangers = ['audit', 'child', 'infant'];

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
    this.contactsForm = new FormGroup({
      code: new FormControl<number | null>(null),
      phone: new FormGroup({
        code: new FormControl(),
        tel: new FormControl(),
      }),
      email: new FormControl<string>(''),
    });
  }
}
