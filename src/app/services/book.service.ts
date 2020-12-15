import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookData } from '../models/book-data';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public booksSelectedArray: Subject<BookData[]> = new Subject<BookData[]>();
  public nbbooksSelected: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) { }
  private auxtab: BookData[] = [];
  getBooks(): Observable<BookData[]> {
    return this.http.get<BookData[]>('http://henri-potier.xebia.fr/books');
  }

  getBook(item: BookData): Observable<BookData | undefined> {
    return this.getBooks().
      pipe(
        map((books: BookData[]) => books.find(b => b.isbn === item.isbn)));
  }

  addSelectedBook(newItem: BookData): void {
    if (newItem) {
      this.auxtab.push(newItem);
      this.booksSelectedArray.next(this.auxtab);
      this.nbbooksSelected.next(this.auxtab.length);
    }
  }

  addOneBook(newItem: BookData): void {
    this.auxtab.push(newItem);
  }

  getSelectedBooks(): BookData[] {
    return this.auxtab;
  }

  getNbSelectedBooks(): Observable<number> {
    return this.nbbooksSelected.asObservable();
  }


  deleteBook(item: BookData): BookData[] {
    this.auxtab = this.auxtab.filter(e => e.isbn.toString() !== item.isbn.toString());
    this.booksSelectedArray.next(this.auxtab);
    this.nbbooksSelected.next(this.auxtab.length);
    return this.auxtab;
  }

  removeOneBook(): BookData[] {
    this.auxtab.splice(0, 1);
    this.nbbooksSelected.next(this.auxtab.length);
    return this.auxtab;
  }

}
