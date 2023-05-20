import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FIREBASE_ORDERS } from '../constants/constants';
import { CurrentOrder } from '../interfaces/interfaces';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserOrdersService {
  uid!: String;
  userOrders: Array<CurrentOrder> = [];

  constructor(private http: HttpClient, public auth: AuthService) {}

  setID() {
    this.uid = this.auth.userData.uid;
  }

  saveNewOrder(currentOrder: CurrentOrder) {
    return this.http
      .post(FIREBASE_ORDERS + '/' + this.uid, currentOrder)
      .subscribe((response) => console.log(response));
  }

  getAllOrders() {
    return this.http.get(FIREBASE_ORDERS + '/' + this.uid).pipe(
      take(2),
      map((orders) => {
        for (let value of Object.values(orders)) {
          this.userOrders.push(value);
        }
      })
    );
  }
}
