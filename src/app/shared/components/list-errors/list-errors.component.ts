import { Component, OnInit, Input } from '@angular/core';
import { ApiErrors, ApiError } from '../../../core/models/api-errors.model';
import { DictionaryString } from '../../../core/models/dictionary-string.model';

@Component({
  selector: 'jm-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent implements OnInit {
  private apiErrors: ApiErrors = null;
  private apiLabels: DictionaryString = null;
  private formattedErrors: Array<string> = null;

  @Input()
  set errors(errors: any) {
    if (!errors) {
      this.apiErrors = null;
    }
    else {
      this.apiErrors = ApiErrors.is(errors) ? errors as ApiErrors : ApiErrors.parse(errors);
    }
    
    this.setMessages();
  }

  @Input()
  set labels(labels: DictionaryString) {
    this.apiLabels = labels;
    this.setMessages();
  }

  get errorList() {
    return this.formattedErrors;
  }

  ngOnInit() {
  }

  private setMessages() {
    if (this.apiErrors && this.apiErrors.count > 0) {
      this.formattedErrors = [];
      this.apiErrors.iterate((err: ApiError) => {
        const key = err.key;
        let message = err.message;

        if (key && message && this.apiLabels && this.apiLabels[key]) {
          const text = this.apiLabels[key];
          message = message.replace(key, text);
        }

        this.formattedErrors.push(message);
      });
    }
    else {
      this.formattedErrors = null;
    }
  }

}
