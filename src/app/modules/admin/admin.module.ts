import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListboxModule } from 'primeng/listbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { ModalDeleteComponent } from '../../shared/components/modal-delete/modal-delete.component';
import { AuthorEditComponent } from './author/author-edit.component';
import { BookEditComponent } from './book/book-edit.component';
import { AuthorsComponent } from './author/authors.component';
import { BooksComponent } from './book/books.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    DynamicDialogModule,
    TableModule,
    CalendarModule,
    ListboxModule,
    FileUploadModule,
    ProgressBarModule,
    InputSwitchModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    EditorModule
  ],
  providers: [
    DialogService
  ],
  declarations: [
    AdminComponent,
    AuthorsComponent,
    AuthorEditComponent,
    BooksComponent,
    BookEditComponent
  ],
  entryComponents: [
    ModalDeleteComponent
  ]
})
export class AdminModule { }
