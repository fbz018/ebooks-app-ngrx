import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BookService } from '../services/book.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as books from '../actions/books.actions';


@Injectable()
export class BooksListEffects {
    @Effect()
    LoadBooks$: Observable<books.BooksActions> =
        this.actions$.pipe(
            ofType(books.LOAD_BOOKS),
            switchMap(() => this.bookService.getBooks()),
            map(data => new books.LoadBooksSuccess(data))

        );

    constructor(private bookService: BookService, private actions$: Actions) {

    }

}
