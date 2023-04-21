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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const AuthModules = [
  CommonModule,
  MatTabsModule,
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatCheckboxModule,
  FormsModule,
  ReactiveFormsModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthWindowComponent,
    SocialLinkComponent,
  ],
  imports: [AuthModules],
  exports: [AuthWindowComponent]
})
export class AuthModule { }
