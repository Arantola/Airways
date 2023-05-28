import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormControlValueAccessorAdapter } from 'src/app/shared/adapters/form-control-value-accessor-adapter';
import { PASSENGERS_LIST } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-passengers-input',
  templateUrl: './passengers-input.component.html',
  styleUrls: ['./passengers-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PassengersInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PassengersInputComponent,
      multi: true,
    },
  ],
})
export class PassengersInputComponent
  extends FormControlValueAccessorAdapter
  implements OnInit
{
  readonly passengerList = PASSENGERS_LIST;

  formGroup!: FormGroup;

  @Output() updateInput = new EventEmitter();

  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger, { static: true, read: ElementRef })
  userMenu!: ElementRef<HTMLElement>;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.formGroup = new FormGroup({
      adults: new FormControl<number>(1),
      children: new FormControl<number>(0),
      infants: new FormControl<number>(0),
    });
  }

  getMinCount(type: string): number {
    return type === 'adults' ? 1 : 0;
  }

  getControlValue(name: string) {
    return this.formGroup.get(name)?.value;
  }

  increaseCounter(type: string) {
    this.formGroup.get(type)?.setValue(this.getControlValue(type) + 1);
    this.updateInput.emit();
  }

  decreaseCounter(type: string) {
    this.formGroup.get(type)?.setValue(this.getControlValue(type) - 1);
    this.updateInput.emit();
  }

  get adults() {
    return this.formGroup.get('adults')!.value;
  }
  get children() {
    return this.formGroup.get('children')!.value;
  }
  get infants() {
    return this.formGroup.get('infants')!.value;
  }

  get passengersDisplay() {
    return `${this.adults > 1 ? `${this.adults} Adults` : '1 Adult'}${
      this.children > 0
        ? `, ${this.children} Child${this.children > 1 ? 'ren' : ''}`
        : ''
    }${
      this.infants > 0
        ? `, ${this.infants} Infant${this.infants > 1 ? 's' : ''}`
        : ''
    }`;
  }

  get passengersLimit() {
    return this.adults + this.children + this.infants > 8;
  }

  get userMenuData() {
    return {
      menuWidth: this.userMenu.nativeElement.clientWidth,
    };
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.menuTrigger?.menuOpen) {
      this.menuTrigger.closeMenu();
    }
  }
}
