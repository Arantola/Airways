import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AIRPORTS } from 'src/app/admin/airports';
import {
  appSettingsActions,
  bookingActions,
} from 'src/app/redux/actions/app.actions';
import {
  BOOKING_PAGES,
  PASSENGERS_LIST,
} from 'src/app/shared/constants/constants';
import { Airport } from 'src/app/shared/interfaces/interfaces';
import { IconService } from 'src/app/shared/services/icon.service';

@Component({
  selector: 'app-main-modal-window',
  templateUrl: './main-modal-window.component.html',
  styleUrls: ['./main-modal-window.component.scss'],
})
export class MainModalWindowComponent implements OnInit {
  readonly passengersList = PASSENGERS_LIST;
  readonly airports: Airport[] = AIRPORTS;

  isRounded: boolean = true;
  initialForm!: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private iconService: IconService
  ) {
    this.iconService.addPath('switch', 'assets/icons/switch.svg');
  }

  ngOnInit() {
    this.initForm();
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'main' }));
  }

  private initForm() {
    this.initialForm = new FormGroup({
      isRounded: new FormControl(true),
      departurePoint: new FormControl(''),
      destinationPoint: new FormControl(''),
      date: new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      }),
      singleDate: new FormControl<Date | null>(null),
      passengersCompound: new FormControl()
    });
  }

  onRadioChange() {
    this.isRounded = !this.isRounded;
  }

  onClickSwitch() {
    const departureValue = this.initialForm.get('departurePoint')?.value;
    const destinationValue = this.initialForm.get('destinationPoint')?.value;
    this.initialForm.get('departurePoint')?.setValue(destinationValue);
    this.initialForm.get('destinationPoint')?.setValue(departureValue);
  }

  onSubmit() {
    this.store.dispatch(
      bookingActions.updateFirstForm({ currentOrder: this.initialForm.value })
    );
    this.router.navigate(['booking', BOOKING_PAGES[0]]);
  }
}
