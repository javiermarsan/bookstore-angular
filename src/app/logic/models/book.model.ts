import { CommonHelper } from 'src/app/core/helpers/common-helper';
import { DateHelper } from 'src/app/core/helpers/date-helper';
import { Author } from './author.model';

export class Book {
    bookId: string;
    title: string;
    publicationDate: Date;
    authorId: string;

    authorName: string;
    
    static fromJS(data: any): Book {
        const obj = CommonHelper.fromJS(Book, data);
        return obj;
    }

    static configBook(book: Book, arrayAuthor: Author[]) {
        const temp = arrayAuthor.filter(e => e.authorId.toLowerCase() == book.authorId.toLowerCase());
        if (temp.length > 0) {
            book.authorName = temp[0].name;
        }
    }
}
