import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../logic/services/admin.service';
import { AlertService } from '../../../core/services/alert.service';
import { DictionaryString } from '../../../core/models/dictionary-string.model';
import { ApiErrors } from '../../../core/models/api-errors.model';
import { Subject, Observable } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { componentDestroyed } from '../../../core/rxjs/component-destroyed';
import { FormHelper } from 'src/app/core/helpers/form-helper';
import { Author } from 'src/app/logic/models/author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'jm-author-edit',
    templateUrl: './author-edit.component.html'
})
export class AuthorEditComponent implements OnInit  {
  data: Author = {} as Author;
  onConfirm: () => void;

  labels: DictionaryString;
  errors: any = null;
  isSubmitting = false;

  public static show(dialogService: DialogService, model: Author, confirmCallback: () => void): DynamicDialogRef {
    const ref: DynamicDialogRef = dialogService.open(AuthorEditComponent, {
            data: {
              model: model,
              confirmCallback: confirmCallback
            },
            header: "Author edition",
            width: "50%",
            style: { "max-width": "700px" },
            baseZIndex: 12000
        });
    return ref;
  }

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private adminService: AdminService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.data) {
      this.onConfirm = config.data.confirmCallback;
      if (config.data.model) {
        this.data = Object.assign({}, config.data.model);
      }
    }

    this.labels = {
      name: 'Name'
    };
  }

  ngOnInit() { }

  cancel() {
    this.ref.close();
  }

  async submitForm(form: NgForm) {
    if (!FormHelper.valid(form)) {
      return;
    }
    
    try {
      this.isSubmitting = true;
      this.errors = null;

      await this.adminService.authorSave(this.data);
      
      this.isSubmitting = false;
      this.alertService.success('Data successfully saved');

      if (this.onConfirm) {
        this.onConfirm();
      }

      this.ref.close();
    }
    catch(error){
      this.errors = error;
      this.isSubmitting = false;
    }
  }
}
