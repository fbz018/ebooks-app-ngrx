import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData } from '../models/book-data';
import { BookService } from '../services/book.service';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  public booksList$: Observable<BookData[]>;
  private sub: any;

  constructor(private bookServices: BookService) { }

  ngOnInit(): void {
  this.booksList$=  this.bookServices.getBooks();
  }

}
