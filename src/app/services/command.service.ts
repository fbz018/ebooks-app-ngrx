import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookSelectedData } from '../models/book-selected-data';
import { BookData } from '../models/book-data';
import { BookService } from './book.service';
import { Offer } from '../models/offer';

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
        elem,
        nbocc: data.reduce((nbc, e) => (JSON.stringify(e) === JSON.stringify(elem) ? nbc + 1 : nbc), 0)
      };
    }).map(i => JSON.stringify(i));

    const filtert = newt.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    ).map(e => JSON.parse(e));

    return filtert;
  }

  getOffers(items: BookSelectedData[]): Observable<Offer[]> {
    const tisbn = items.map((item: BookSelectedData) => ((item.elem) as BookData).isbn);
    const offersUrls = 'http://henri-potier.xebia.fr/books/' + tisbn.join() + '/commercialOffers';

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.get(offersUrls).pipe(map((data: any) => data.offers));
  }

}
