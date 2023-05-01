import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-trip',
  templateUrl: './cart-trip.component.html',
  styleUrls: ['./cart-trip.component.scss']
})
export class CartTripComponent {
  constructor(private router: Router) {}

  public editTrip() {
    this.router.navigate(['/booking', 'flight-selection'])
  }
}
