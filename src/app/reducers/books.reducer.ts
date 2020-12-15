import { BooksActions } from '../actions/books.actions';
import { BookData } from '../models/book-data';

import * as books from '../actions/books.actions';

export interface State {
    loading: boolean;
    books: BookData[];
}

export const initialState: State = {
    loading: false,
    books: []
};

export function reducer(state: State, action: BooksActions): State {
    switch (action.type) {
        case books.LOAD_BOOKS: {
            return { ...state, loading: true };
        }

        case books.SUCCESS_LOAD_BOOKS: {
            return { ...state, books: action.payload };
        }
        default: return state;
    }
}

export const getBooks = (state: State) => state.books;
