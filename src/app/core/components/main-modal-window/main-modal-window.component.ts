import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AIRPORTS } from 'src/app/admin/airports';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';
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
        start: new FormControl(), // TODO Add validator if the day has passed
        end: new FormControl(),
      }),
      singleDate: new FormControl(), // TODO Add validator date || singleDate
      passengersCompound: new FormControl(),
    });
  }

  private subscribeToCurrentOrder() {
    this.subscriptionCurrentOrder = this.store
      .select(selectCurrentOrder)
      .subscribe((currentOrder) => {
        this.currentOrder = currentOrder;
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
    const form = this.initialForm.value;

    const {
      isRounded,
      departurePoint,
      destinationPoint,
      date,
      singleDate,
      passengersCompound,
    } = form;

    this.router.navigate(['booking', BOOKING_PAGES[0]], {
      queryParams: {
        isRounded: isRounded ? 1 : undefined,
        departurePoint: departurePoint === '' ? undefined : departurePoint.iata,
        destinationPoint: destinationPoint === '' ? undefined : destinationPoint.iata,
        dateStart: date?.start?.toJSON() ?? undefined,
        dateEnd: date?.end?.toJSON() ?? undefined,
        singleDate: singleDate.toJSON() ?? undefined,
        adults: passengersCompound.adults === 0 ? undefined : passengersCompound.adults,
        children: passengersCompound.children === 0 ? undefined : passengersCompound.children,
        infants: passengersCompound.infants === 0 ? undefined : passengersCompound.infants,
      }
    });
  }
}
