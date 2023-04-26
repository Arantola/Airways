import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthWindowComponent } from './pages/auth-window/auth-window.component';
import { SocialLinkComponent } from './components/social-link/social-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

const AuthComponents = [
  SignInComponent,
  SignUpComponent,
  AuthWindowComponent,
  SocialLinkComponent,
];

@NgModule({
  declarations: [AuthComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [AuthComponents],
})
export class AuthModule {}
