import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthWindowComponent } from './pages/auth-window/auth-window.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SocialLinkComponent } from './components/social-link/social-link.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthWindowComponent,
    SocialLinkComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [AuthWindowComponent]
})
export class AuthModule { }
