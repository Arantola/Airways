import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  static readonly FIRST_STEP = 1;
  static readonly THIRD_STEP = 3;

  constructor() {}

  public step = StepperComponent.FIRST_STEP;

  goNextStep() {
    if (this.step < StepperComponent.THIRD_STEP) {
      this.step++;
    } else {
      return;
    }
  }

  goBackStep() {
    if (this.step > StepperComponent.FIRST_STEP) {
      this.step--;
    } else {
      return;
    }
  }
}
