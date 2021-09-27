import {
  Component,
  Optional,
  Inject,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  NgForm,
} from '@angular/forms';
import { BaseComponent } from '../../form/base-component';

@Component({
  selector: 'jm-form-input',
  templateUrl: './form-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormInputComponent,
    multi: true,
  }],
})
export class FormInputComponent extends BaseComponent<string> {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() type = 'text'; // text, integer, decimal

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();  

  @ViewChild(NgModel, { static: true}) model: NgModel;

  identifier = `jm-form-input-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);    
  }

  // on key press
  controlInput(event) {
    let value = event.target.value;
    if (value && this.type == 'integer') {
      value = value.toString().replace(/[^0-9]/g, '');
      this.model.update.emit(value);
    }
    else if (value && this.type == 'decimal') {
      value = value.toString().replace(/[^0-9.]/g, '');
      this.model.update.emit(value);
    }

    event.target.value = value;
    this.onChange.emit(event);
  }

  // on focus out
  controlChange(event) {
    //
  }
}

let identifier = 0;
