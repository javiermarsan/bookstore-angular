// https://rangle.io/blog/angular-2-ngmodel-and-custom-form-components/

import {NgModel, FormControl, NgForm, FormGroup, FormArray, NG_VALIDATORS, NG_ASYNC_VALIDATORS} from '@angular/forms';
import {Observable} from 'rxjs';
import {ValueAccessorBase} from './value-accessor';
import { Component, Inject, Input } from '@angular/core';

import {
  AsyncValidatorArray,
  ValidatorArray,
  ValidationResult,
  message,
  validate,
} from './validate';
import { map } from 'rxjs/operators';

@Component({
  template: ''
})
export abstract class BaseComponent<T> extends ValueAccessorBase<T> {
  @Input() form: NgForm;
  
  protected abstract model: NgModel;

  constructor(
    @Inject(NG_VALIDATORS) private validators: ValidatorArray,
    @Inject(NG_ASYNC_VALIDATORS) private asyncValidators: AsyncValidatorArray
  ) {
    super();
  }

  protected validate(): Observable<ValidationResult> {
    return validate
      (this.validators, this.asyncValidators)
      (this.model.control);
  }

  public get invalid(): Observable<boolean> {
    return this.validate().pipe(map(v => Object.keys(v || {}).length > 0));
  }

  public get failures(): Observable<Array<string>> {
    return this.validate().pipe(map(v => Object.keys(v).map(k => message(v, k))));
  }

  public get controlTouched(): boolean {
    return this.model?.control?.touched;
  }

  public get formTouched(): boolean {
    return this.form?.touched;
  }
}
