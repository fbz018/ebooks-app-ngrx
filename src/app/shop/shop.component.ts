import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData } from '../models/book-data';
import { BookSelectedData } from '../models/book-selected-data';
import { Offer } from '../models/offer';
import { BookService } from '../services/book.service';
import { CommandService } from '../services/command.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public selectedBooks: BookSelectedData[] = [];
  public show = false;
  public offers$: Observable<Offer[]> = undefined;
  public montantAPayer = 0;
  public montantTotal = 0;  constructor(private commandService: CommandService, private bookService: BookService) {

  }

  ngOnInit(): void {
    const books = this.bookService.getSelectedBooks();
    this.selectedBooks = this.commandService.getBooksInCommand(books);
  }

  public trackByFn = (item: BookSelectedData) => (item) ? item.elem : undefined;

  public showOffersPanel(items): void{
    this.show = !this.show;
    this.offers$ = this.commandService.getOffers(items);
    this.offers$.subscribe(
      data => console.log(JSON.stringify(data)));
  }

  offerPercentClicked(reduc: number): void {
    this.montantAPayer = (this.montantTotal - (reduc * this.montantTotal) / 100);
  }
  offerMinusClicked(reduc: number): void {
    this.montantAPayer = this.montantTotal - reduc;
  }

  offerSliceClicked(reduc: number): void {
    this.montantAPayer = this.montantTotal - Math.floor(this.montantTotal / 100) * reduc;
  }

  public getMontantTotal(): number {
    this.montantTotal = this.selectedBooks.reduce(((s, item) => (item.elem.price * item.nbocc) + s), 0);
    return this.montantTotal;
  }

  deleteBookFromList(item: BookData): void {
    const newlist = this.bookService.deleteBook(item);
    this.selectedBooks = this.commandService.getBooksInCommand(newlist);
  }

 removeOneBook(item: BookData): void {
  const newlist = this.bookService.removeOneBook();
  this.selectedBooks = this.commandService.getBooksInCommand(newlist);
 }

 addOneBook(item: BookData): void {
  this.bookService.addSelectedBook(item);
  const books = this.bookService.getSelectedBooks();
  this.selectedBooks = this.commandService.getBooksInCommand(books);
 }

}
