import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AIRPORTS } from 'src/app/admin/airports';
import { bookingActions } from 'src/app/redux/actions/app.actions';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.scss'],
})
export class SecondFormComponent implements OnInit, OnDestroy {
  private subscriptionCurrentOrder!: Subscription;

  currentOrder!: CurrentOrder;
  secondForm!: FormGroup;
  airports = AIRPORTS;
  minDate: Date;

  constructor(private store: Store) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToCurrentOrder();
    this.prefillForm();
  }

  ngOnDestroy(): void {
    this.subscriptionCurrentOrder.unsubscribe();
  }

  private initForm() {
    this.secondForm = new FormGroup({
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
      });
  }

  private prefillForm() {
    this.secondForm.patchValue({
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

  get destinationPoint() {
    return this.secondForm.get('destinationPoint')?.value;
  }

  get departurePoint() {
    return this.secondForm.get('departurePoint')?.value;
  }

  onUpdateForm() {
    this.store.dispatch(
      bookingActions.updateFirstForm({ currentOrder: this.secondForm.value })
    );
  }
}
