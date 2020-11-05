import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BookSelectedData } from '../models/book-selected-data';
import { BookData } from '../models/book-data';
import { BookService } from './book.service';
import { Offer } from '../models/offer';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  public booksInCommand: Subject<BookSelectedData[]> = new Subject<BookSelectedData[]>();

  constructor(private http: HttpClient, private bookService: BookService) { }

  getBooksInCommand(data: BookData[]): BookSelectedData[] {
    let newt = [];
    newt = data.map((elem: BookData) => {
      return {
        elem: elem,
        nbocc: data.reduce((nbc, e) => (JSON.stringify(e) === JSON.stringify(elem) ? nbc + 1 : nbc), 0)
      }
    }).map(i => JSON.stringify(i));

    let filtert = newt.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    ).map(e => JSON.parse(e));

    return filtert;
  }

  getOffers(items: BookSelectedData[]): Observable<Offer[]> {

    let tisbn = items.map((item: BookSelectedData) => ((item.elem) as BookData).isbn);
    let offersUrls = 'http://henri-potier.xebia.fr/books/' + tisbn.join() + '/commercialOffers';

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.get(offersUrls).pipe(map((data: any) => data.offers));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // A server-side
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
