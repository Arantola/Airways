import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FIREBASE_ORDERS } from '../constants/constants';
import { CurrentOrder, UserOrder } from '../interfaces/interfaces';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserOrdersService {
  uid!: String;
  userOrders: Array<UserOrder> = [];

  constructor(private http: HttpClient) {}

  private setID() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.uid = user.uid;
  }

  saveNewOrder(currentOrder: CurrentOrder) {
    this.setID();
    return this.http
      .post(`${FIREBASE_ORDERS}/${this.uid}.json`, currentOrder)
      .subscribe((response) => console.log(response));
  }

  getAllOrders() {
    this.setID();
    return this.http
      .get(`${FIREBASE_ORDERS}/${this.uid}.json`)
      .pipe(
        map((orders) => {
          for (const [key, value] of Object.entries(orders)) {
            const order = {
              [key]: value,
            };
            this.userOrders.push(order);
          }

          return this.userOrders as UserOrder[];
        })
      )
  }

  overwriteOrder(userOrder: UserOrder) {
    this.setID();
    return this.http
      .patch(`${FIREBASE_ORDERS}/${this.uid}.json`, JSON.stringify(userOrder))
  }

  deleteOrder(id: string) {
    this.setID();
    return this.http.delete(`${FIREBASE_ORDERS}/${this.uid}/${id}.json`);
  }
}
