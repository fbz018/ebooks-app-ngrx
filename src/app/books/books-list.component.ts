import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookData } from '../models/book-data';
import { BookService } from '../services/book.service';
import * as fromRoot from '../reducers/index';
import { LoadBooks } from '../actions/books.actions';
@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  public booksList$: Observable<BookData[] | undefined>;
  private sub: any;

  constructor(
    private store: Store<fromRoot.State>) {

    this.store.dispatch(new LoadBooks());
  }

  ngOnInit(): void {
    ///this.booksList$=  this.bookServices.getBooks();
    this.booksList$ = this.store.select(fromRoot.selectBooksSelector$)
  }

}
