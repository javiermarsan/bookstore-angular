import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../logic/services/admin.service';
import { AlertService } from '../../../core/services/alert.service';
import { DictionaryString } from '../../../core/models/dictionary-string.model';
import { FormHelper } from 'src/app/core/helpers/form-helper';
import { Book } from 'src/app/logic/models/book.model';
import { Author } from 'src/app/logic/models/author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { DomSanitizer } from '@angular/platform-browser'; 
import { DateHelper } from 'src/app/core/helpers/date-helper';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'jm-book-edit',
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit  {
  @ViewChild('fm') form: NgForm;

  data: Book = new Book();

  labels: DictionaryString;
  errors: any = null;
  isLoading = false;
  isSubmitting = false;

  arrayAuthor: Author[];

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService
  ) {
    this.labels = {
      title: 'Title',
      publicationDate: 'Publication Date',
      authorId: 'Author'
    };
  }

  async ngOnInit() {
    const params = this.route.snapshot.params;
    const paramId: string = params.id;

    try {
      this.arrayAuthor = await this.adminService.authorList();
    }
    catch(error){
      this.alertService.error(error);
    }

    if (paramId) { 
      this.isLoading = true;
      try {
        this.data = await this.adminService.book(paramId.toUpperCase());
        if (!this.data) {
          this.alertService.error("Data not found");
          await this.router.navigateByUrl('404');
          return;
        }

        this.configBook();
      }
      catch (error) {
        this.alertService.error(error);
      }
      this.isLoading = false;
    }
  }

  private configBook() {
    if (this.arrayAuthor) {
      Book.configBook(this.data, this.arrayAuthor);
    }
  }

  async submitData() {
    if (this.form && !FormHelper.valid(this.form)) {
      this.alertService.error("The form fields need to be reviewed.");
      return;
    }

    try {
      const insert: boolean = !this.data.bookId;
      this.isSubmitting = true;
      this.errors = null;
      
      // save
      if (insert) {
        this.data.bookId = await this.adminService.bookInsert(this.data);
      }
      else {
        await this.adminService.bookUpdate(this.data);
      }

      this.isSubmitting = false;
      this.alertService.success('Data successfully saved');

      if (insert) {
        await this.router.navigateByUrl('admin/book/' + this.data.bookId);
      }
      else {
        this.data = await this.adminService.book(this.data.bookId);
        this.configBook();
      }
    }
    catch(error){
      this.alertService.error(error, this.labels);
      this.errors = error;
      this.isSubmitting = false;
    }
  }
}
