import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isShowWindow = false;
  //userName: string;

  constructor() { }

  showAuthWindow(): void {
    this.isShowWindow = !this.isShowWindow;
  }

  getShowWindowValue(): boolean {
    return this.isShowWindow;
  }
}
