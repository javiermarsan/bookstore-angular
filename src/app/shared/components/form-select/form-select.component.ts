import {
  Component,
  Optional,
  Inject,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import { BaseComponent } from '../../form/base-component';

@Component({
  selector: 'jm-form-select',
  templateUrl: './form-select.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormSelectComponent,
    multi: true,
  }],
})
export class FormSelectComponent extends BaseComponent<string> {
  @Input() options: any[];
  @Input() optionsValue: string;
  @Input() optionsText: string;
  @Input() disabled = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(NgModel, { static: true}) model: NgModel;

  identifier = `jm-form-select-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }

  controlChange(event): void {
    this.onChange.emit(event);
  }
}

let identifier = 0;
