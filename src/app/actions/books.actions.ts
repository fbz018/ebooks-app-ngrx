
import {Action } from '@ngrx/store'
import { BookData } from '../models/book-data';

export const LOAD_BOOKS = '[Books] Load Books';
export const SUCCESS_LOAD_BOOKS = '[Books] Success Load Books';


export class LoadBooks implements Action {
    readonly type = LOAD_BOOKS;
    constructor(){}
}

export class LoadBooksSuccess implements Action {
    readonly type = SUCCESS_LOAD_BOOKS;
    constructor(public payload:BookData[]){}
}

export type BooksActions = LoadBooks | LoadBooksSuccess;