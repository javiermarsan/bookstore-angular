import { NgForm, FormGroup, AbstractControl, FormArray } from '@angular/forms';

export class FormHelper {
  public static valid(ngForm: NgForm): boolean  {
    if (!ngForm) {
      return false;
    }

    ngForm.form.markAllAsTouched();

    /*for (const field of Object.keys(ngForm.controls)) {
      const control: AbstractControl = ngForm.controls[field];
      control.markAsTouched();
    }*/

    return ngForm.valid;
  }
}
