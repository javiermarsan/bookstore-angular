import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private api: ApiService) {}

  // Author
  async authorList(): Promise<Author[]> {
    return await this.api.get('/author');
  }

  async author(id: string): Promise<Author> {
    return await this.api.get('/author/' + id);
  }

  async authorDelete(model: Author): Promise<void> {
    await this.api.post('/author/delete', model);
  }
 
  async authorSave(model: Author): Promise<void> {
    if (model && model.authorId) { // update
      await this.api.post('/author/update', model);
    }
    else { // insert
      await this.api.post('/author/create', model);
    }
  }

  // Book
  async bookList(): Promise<Book[]> {
    return (await this.api.get('/book')).map(e => Book.fromJS(e));
  }

  async book(id: string): Promise<Book> {
    const obj = await this.api.get('/book/' + id);
    return obj ? Book.fromJS(obj) : null;
  }

  async bookInsert(model: Book): Promise<string> {
    return await this.api.post('/book/create', model);
  }

  async bookUpdate(model: Book): Promise<void> {
    await this.api.post('/book/update', model);
  }

  async bookDelete(model: Book): Promise<void> {
    await this.api.post('/book/delete', model);
  }
}
