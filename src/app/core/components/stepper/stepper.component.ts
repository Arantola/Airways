import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  constructor(){
  }

  isFirstStep = true;

  isSecondStep = false;

  isThirdStep = false;

  goNextStep() {
    if (this.isThirdStep === true) {
      return;
    }

    if (this.isFirstStep === true) {
      this.isFirstStep = false;
      this.isSecondStep = true;
      return;
    }

    if (this.isSecondStep === true) {
      this.isSecondStep = false;
      this.isThirdStep = true;
      return;
    }

  }

  goBackStep() {
    if (this.isFirstStep === true) {
      return;
    }

    if (this.isSecondStep === true) {
      this.isFirstStep = true;
      this.isSecondStep = false;
      return;
    }

    if (this.isThirdStep === true) {
      this.isSecondStep = true;
      this.isThirdStep = false;
      return;
    }
  }
}
