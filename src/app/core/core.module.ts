import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { PageContainerComponent } from './pages/page-container/page-container.component';
import { AppRoutingModule } from '../app-routing.module';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingModule } from '../booking/booking.module';
import { MainModalWindowComponent } from './components/main-modal-window/main-modal-window.component';
import { AuthModule } from '../auth/auth.module';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CartTableComponent } from './components/shopping-cart/cart-table/cart-table.component';

const CoreComponents = [
  HeaderComponent,
  StepperComponent,
  PageContainerComponent,
  SecondMenuComponent,
  MainModalWindowComponent,
  FooterComponent,
  CartComponent,
];

@NgModule({
  declarations: [CoreComponents, UserAccountComponent, CartTableComponent],
  exports: [CoreComponents],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BookingModule,
    AuthModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class CoreModule {}
