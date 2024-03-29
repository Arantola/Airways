import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AIRPORTS } from 'src/app/shared/constants/airports';
import { appSettingsActions, bookingActions } from 'src/app/redux/actions/app.actions';
import { selectCurrentOrder, selectSettingsState } from 'src/app/redux/selectors/app.selectors';
import {
  BOOKING_PAGES,
  PASSENGERS_LIST,
} from 'src/app/shared/constants/constants';
import { Airport, CurrentOrder, DateFormat } from 'src/app/shared/interfaces/interfaces';
import { IconService } from 'src/app/shared/services/icon.service';

@Component({
  selector: 'app-main-modal-window',
  templateUrl: './main-modal-window.component.html',
  styleUrls: ['./main-modal-window.component.scss'],
})
export class MainModalWindowComponent implements OnInit, OnDestroy {
  private subscriptionCurrentOrder!: Subscription;

  readonly passengersList = PASSENGERS_LIST;
  readonly airports: Airport[] = AIRPORTS;

  isRounded: boolean = true;
  initialForm!: FormGroup;
  currentOrder!: CurrentOrder;
  minDate: Date;

  public settings$ = this.store.select(selectSettingsState);
  private settingsSubscription?: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private iconService: IconService,
    private _adapter: DateAdapter<Date>,
    @Inject(MAT_DATE_FORMATS) private _formats: DateFormat,
  ) {
    this.iconService.addPath('switch', 'assets/icons/switch.svg');
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(appSettingsActions.changePage({ currentPage: 'main' }));
    this.subscribeToCurrentOrder();
    this.prefillForm();
    this.settingsSubscription = this.settings$.subscribe(
      (settings) => {
        this._formats.parse.dateInput = settings.dateFormat;
        this._formats.display.dateInput = settings.dateFormat;
        this._adapter.setLocale('en');
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptionCurrentOrder.unsubscribe();
    this.settingsSubscription?.unsubscribe();
  }

  private initForm() {
    this.initialForm = new FormGroup({
      isRounded: new FormControl(true, Validators.required),
      departurePoint: new FormControl('', Validators.required),
      destinationPoint: new FormControl('', Validators.required),
      date: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
      singleDate: new FormControl(),
      passengersCompound: new FormControl(),
    });
  }

  private subscribeToCurrentOrder() {
    this.subscriptionCurrentOrder = this.store
      .select(selectCurrentOrder)
      .subscribe((currentOrder) => {
        this.currentOrder = currentOrder;
        this.isRounded = currentOrder.isRounded;
      });
  }

  private prefillForm() {
    this.initialForm.patchValue({
      isRounded: this.currentOrder.isRounded,
      departurePoint: this.currentOrder.departurePoint,
      destinationPoint: this.currentOrder.destinationPoint,
      date: {
        start: this.currentOrder.date.start,
        end: this.currentOrder.date.end,
      },
      singleDate: this.currentOrder.singleDate,
      passengersCompound: this.currentOrder.passengersCompound,
    });
  }

  isFormValid() {
    return (
      ((typeof this.start !== 'undefined' && typeof this.end !== 'undefined') ||
        typeof this.singleDate !== 'undefined') &&
      this.initialForm.valid
    );
  }

  get singleDate() {
    return this.initialForm.get('singleDate')?.value;
  }

  get end() {
    return this.initialForm.get('date.end')?.value;
  }

  get start() {
    return this.initialForm.get('date.start')?.value;
  }

  get destinationPoint() {
    return this.initialForm.get('destinationPoint')?.value;
  }

  get departurePoint() {
    return this.initialForm.get('departurePoint')?.value;
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
