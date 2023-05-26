import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { firebaseConfig } from './fbconfig';

import { StoreModule } from '@ngrx/store';
import { currentOrderReducer } from './redux/reducers/current-order.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appSettingsReducer } from './redux/reducers/settings.reducer';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './shared/material/material.module';
import { BookingModule } from './booking/booking.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from './redux/effects/orders.effects';
import { ordersReducer } from './redux/reducers/orders.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    EffectsModule.forRoot(OrdersEffects),
    StoreModule.forRoot({
      orders: ordersReducer,
      settingsState: appSettingsReducer,
      currentOrderState: currentOrderReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AdminModule,
    BookingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
