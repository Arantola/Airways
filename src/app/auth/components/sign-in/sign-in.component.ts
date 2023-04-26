import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Output() userSignIn = new EventEmitter();

  signInForm!: FormGroup;
  isHidePassword = true;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.signInForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }

  get userEmail() {
    return this.signInForm.get('userEmail')?.value;
  }

  get userPassword() {
    return this.signInForm.get('userPassword')?.value;
  }

  makeVisiblePassword() {
    this.isHidePassword = !this.isHidePassword;
  }

  onSignIn() {
    if (this.signInForm.valid) {
      alert(`You sign in with ${this.userEmail}`);
      this.userSignIn.emit(true);
      this.authService.SignIn(this.userEmail, this.userPassword);
    }
  }
}
