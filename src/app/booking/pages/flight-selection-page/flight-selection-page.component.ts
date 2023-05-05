import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      appSettingsActions.changePage({ currentPage: BOOKING_PAGES[0] })
    );
  }

  saveTicket() {
    this.router.navigate(['booking', BOOKING_PAGES[1]]);
  }
}
