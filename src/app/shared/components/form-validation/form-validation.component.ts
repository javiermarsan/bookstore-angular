import {Component, Input} from '@angular/core';

@Component({
  selector: 'jm-form-validation',
  template: `
    <div class="validation">
      <div *ngFor="let message of messages">{{message}}</div>
    </div>
  `,
  styles: [`
    .validation {
      color: red;
      margin: 4px;
      font-size: 13px;
    }`
  ]
})
export class FormValidationComponent {
  @Input() messages: Array<string>;
}
