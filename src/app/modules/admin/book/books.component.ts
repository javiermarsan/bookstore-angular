import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AdminService } from '../../../logic/services/admin.service';
import { UserAccountService } from '../../../core/services/user-account.service';
import { AlertService } from '../../../core/services/alert.service';
import { ModalDeleteComponent } from '../../../shared/components/modal-delete/modal-delete.component';
import { TableQueryComponent } from '../../../shared/components/table-query/table-query.component';
import { take } from 'rxjs/operators';
import { Book } from 'src/app/logic/models/book.model';
import { BookEditComponent } from './book-edit.component';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'jm-books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit  {
  data: Book[];
  cols: any[];

  constructor(
    private userService: UserAccountService,
    private router: Router,
    private dialogService: DialogService,
    private adminService: AdminService,
    private alertService: AlertService) { }

  async ngOnInit() {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'publicationDate', header: 'Publication Date', width: '200px', formatDate: 'MM/dd/yyyy' }
    ];

    await this.query();
  }

  private async query() {
    try {
      this.data = await this.adminService.bookList();
    }
    catch(error) {
      this.alertService.error(error);
    }
  }

  async edit(row: Book) {
    const param = row ? row.bookId : ''; 
    await this.router.navigateByUrl('admin/book/' + param);
  }

  delete(row: Book) {
    ModalDeleteComponent.show(this.dialogService, async () => {
      await this.adminDelete(row);
    });
  }

  private async adminDelete(row: Book) {
    try {
      await this.adminService.bookDelete(row);
      this.alertService.success('Data successfully deleted');

      await this.query();
    }
    catch(error) {
      this.alertService.error(error);
    }
  }
}

