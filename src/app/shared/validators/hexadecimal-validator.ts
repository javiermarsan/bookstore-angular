// https://rangle.io/blog/angular-2-ngmodel-and-custom-form-components/

import { Directive } from '@angular/core';
import {Observable, of} from 'rxjs';

import {
  NG_VALIDATORS,
  AbstractControl,
  AsyncValidatorFn,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[jm-hexadecimal][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: HexadecimalValueValidator, multi: true }
  ]
})
export class HexadecimalValueValidator implements Validator {
  validate(control: AbstractControl): {[validator: string]: string} {
  //validate(control: AbstractControl): Observable<{[validator: string]: string}> {

    const expression = /^([0-9a-fA-F]+)$/i;
    if (!control.value) { // the [required] validator will check presence, not us
      //return of(null);
      return null;
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      //return of(null);
      return null;
    }

    // Example of how to do asynchronous validation
    /*return new Observable(obs => {
      //setImmediate(() => {
        obs.next({hexadecimal: 'Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)'});
        obs.complete();
      //});
    });*/
    return { "jm-hexadecimal": 'Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)'};
  }
}
