import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
export abstract class FormControlValueAccessorAdapter
  implements ControlValueAccessor, Validator
{
  abstract formGroup: FormGroup;

  onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid
      ? null
      : {
          invalidForm: {
            value: this.formGroup.value,
            message: `Nested form is invalid`,
          },
        };
  }
}
