import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromBooks from '../reducers/books.reducer'

export interface State {
  books: fromBooks.State;
}

export const initiliseState = {
  books:[]
}

export const reducers: ActionReducerMap<State> = {
 books: fromBooks.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


export const booksState$ = (state: State) => state.books;
export const selectBooksSelector$ = createSelector(booksState$, fromBooks.getBooks)
