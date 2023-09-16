import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.length < minLength) {
      return { 'minLength': true };
    }
    return null;
  };
}

export function maxLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.length > maxLength) {
      return { 'maxLength': true };
    }
    return null;
  };
}

export function matchPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ matchPassword: true });
      return { matchPassword: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}