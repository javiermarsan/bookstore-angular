import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from '../../logic/guards/admin-auth.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthorsComponent } from './author/authors.component';
import { BooksComponent } from './book/books.component';
import { BookEditComponent } from './book/book-edit.component';
import { ManagerAuthGuard } from 'src/app/logic/guards/manager-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ManagerAuthGuard],
    children: [
      {
        path: 'authors',
        component: AuthorsComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'books',
        component: BooksComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'book',
        component: BookEditComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'book/:id',
        component: BookEditComponent,
        canActivate: [AdminAuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
