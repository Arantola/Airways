import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthWindowComponent } from './pages/auth-window/auth-window.component';
import { SocialLinkComponent } from './components/social-link/social-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

const AuthModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthWindowComponent,
    SocialLinkComponent,
  ],
  imports: [AuthModules, MaterialModule],
  exports: [AuthWindowComponent]
})
export class AuthModule { }
