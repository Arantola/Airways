import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AIRPORTS } from 'src/app/admin/airports';
import { selectCurrentOrder } from 'src/app/redux/selectors/app.selectors';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.scss'],
})
export class SecondFormComponent implements OnInit {
  currentOrder!: CurrentOrder;
  secondForm!: FormGroup;
  airports = AIRPORTS;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToCurrentOrder();
    this.fullForm();
  }

  private initForm() {
    this.secondForm = new FormGroup({
      departurePoint: new FormControl(''),
      destinationPoint: new FormControl(''),
      date: new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      }),
      singleDate: new FormControl<Date | null>(null),
      passengersCompound: new FormControl(1),
    });
  }

  private subscribeToCurrentOrder() {
    this.store.select(selectCurrentOrder).subscribe((currentOrder) => {
      this.currentOrder = currentOrder;
    });
  }

  private fullForm() {
    if (this.currentOrder) {
      // this.secondForm patch
    }
  }
}
