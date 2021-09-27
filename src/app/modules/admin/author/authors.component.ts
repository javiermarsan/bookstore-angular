import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AdminService } from '../../../logic/services/admin.service';
import { UserAccountService } from '../../../core/services/user-account.service';
import { AlertService } from '../../../core/services/alert.service';
import { ModalDeleteComponent } from '../../../shared/components/modal-delete/modal-delete.component';
import { TableQueryComponent } from '../../../shared/components/table-query/table-query.component';
import { take } from 'rxjs/operators';
import { Author } from 'src/app/logic/models/author.model';
import { AuthorEditComponent } from './author-edit.component';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'jm-authors',
  templateUrl: './authors.component.html'
})
export class AuthorsComponent implements OnInit  {
  data: Author[];
  cols: any[];

  constructor(
    private userService: UserAccountService,
    private router: Router,
    private dialogService: DialogService,
    private adminService: AdminService,
    private alertService: AlertService) { }

  async ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' }
    ];

    await this.query();
  }

  private async query() {
    try {
      this.data = await this.adminService.authorList();
    }
    catch (error) {
      this.alertService.error(error);
    }
  }

  async edit(row: Author) {
    AuthorEditComponent.show(this.dialogService, row, async () => {
      await this.query();
    });
  }

  delete(row: Author) {
    ModalDeleteComponent.show(this.dialogService, async () => {
      await this.adminDelete(row);
    });
  }

  private async adminDelete(row: Author) {
    try {
      await this.adminService.authorDelete(row);
      this.alertService.success('Data successfully deleted');

      await this.query();
    }
    catch(error) {
      this.alertService.error(error);
    }
  }
}

