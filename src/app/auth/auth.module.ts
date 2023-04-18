import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthWindowComponent } from './pages/auth-window/auth-window.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SocialLinkComponent } from './components/social-link/social-link.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthWindowComponent,
    SocialLinkComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [AuthWindowComponent]
})
export class AuthModule { }
