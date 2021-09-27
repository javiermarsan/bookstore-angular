import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { UserAccountService } from '../../core/services/user-account.service';
import { take } from 'rxjs/operators';

@Directive({ selector: '[tcShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserAccountService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

  ngOnInit() {
    this.userService.isAuthenticated.pipe(take(1)).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input() set tcShowAuthed(condition: boolean) {
    this.condition = condition;
  }

}
