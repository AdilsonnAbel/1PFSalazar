import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { StudentId, typeClassroom } from '../interfaces/student';

const roomNames: typeClassroom[] = [
  'alpha',
  'beta',
  'gamma',
  'delta',
  'epsilon',
  'zeta',
  'eta',
];

export const valRoomName = (data: string): boolean =>
  (roomNames as string[]).includes(data);

export class Validation {
  static known(controlName: string, names: string[]): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const value: string | StudentId = control?.value;
      const name: string =
        typeof value === 'string'
          ? value.toLowerCase()
          : value.name.toLowerCase();

      if (control?.errors && !control.errors['unknown']) return null;

      if (!names.includes(name)) {
        control?.setErrors({ unknown: true });
        return { unknown: true };
      } else {
        return null;
      }
    };
  }
}
