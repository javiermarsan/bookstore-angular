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
import { DateHelper } from 'src/app/core/helpers/date-helper';

let identifier = 0;

// https://www.primefaces.org/primeng/showcase/#/calendar
@Component({
  selector: 'jm-form-date',
  templateUrl: './form-date.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormDateComponent,
    multi: true,
  }],
})
export class FormDateComponent extends BaseComponent<Date> {
  @Input() disabled = false;
  @Input() inline: boolean = false;
  @Input() minDate: Date;
  @Input() disabledDays: number[];
  @Input() disabledDates: Date[];
  @Input() timeOnly: boolean;

  @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();  

  @ViewChild(NgModel, { static: true}) model: NgModel;

  identifier = `jm-form-date-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);  
  }

  controlChange(value: Date): void {
    this.onChange.emit(value);
  }
}
