import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  valueEmail = '';
  valuePassword = '';
  isHidePassword = true;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      userPassword: new FormControl('', [
        Validators.required,
      ])
    })
  }

  makeVisiblePassword() {
    this.isHidePassword = !this.isHidePassword;
  }
}
