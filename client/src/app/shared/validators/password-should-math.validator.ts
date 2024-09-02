import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passswordShouldMatch(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  const errors = { passswordShouldMatch: { mismatch: true } };
  if (password?.value === confirmPassword?.value) {
    return null;
  }
  confirmPassword?.setErrors(errors);
  return errors;
}
