import { getNumberOfCurrencyDigits } from '@angular/common';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { element } from 'protractor';
import { BookData } from './book-data';

export interface BookSelectedData {
    elem: BookData
    nbocc: number;
}
function getMontant(book: BookSelectedData) {
    return book.elem.price * book.nbocc;
}