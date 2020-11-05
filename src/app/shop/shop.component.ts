import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  private subscriptionCommd: Subscription;
  public show: boolean = false;
  public offers$: Observable<Offer[]> = undefined;
  public montantAPayer: number = 0;
  public montantTotal: number = 0
  constructor(private commandService: CommandService, private bookService: BookService) {

  }

  ngOnInit() {
    let books = this.bookService.getSelectedBooks();
    this.selectedBooks = this.commandService.getBooksInCommand(books);
    // .subscribe(
    //   data =>{
    //     console.log('data in shop..', data);
    //     this.selectedBooks = this.commandService.getBooksInCommand(data);
    //   } ,
    //   err => console.log('error....')

    // )
  }

  public trackByFn = (index: number, item: BookSelectedData) => (item) ? item.elem : undefined;

  public showOffersPanel(items) {
    this.show = !this.show;
    this.offers$ = this.commandService.getOffers(items)
    this.offers$.subscribe(
      data => console.log(JSON.stringify(data)));
  }

  offerPercentClicked(reduc: number) {
    this.montantAPayer = (this.montantTotal - (reduc * this.montantTotal) / 100);
  }
  offerMinusClicked(reduc: number) {
    this.montantAPayer = this.montantTotal - reduc;
  }

  offerSliceClicked(reduc: number) {
    this.montantAPayer = this.montantTotal - Math.floor(this.montantTotal / 100) * reduc;
  }

  public getMontantTotal() {
    this.montantTotal = this.selectedBooks.reduce(((s, item) => (item.elem.price * item.nbocc) + s), 0);
    return this.montantTotal;
  }

  deleteBookFromList(item:BookData, index) {
    let newlist= this.bookService.deleteBook(item, index);
    this.selectedBooks = this.commandService.getBooksInCommand(newlist);
  }

 removeOneBook(item:BookData) {
  let newlist= this.bookService.removeOneBook(item);
    this.selectedBooks = this.commandService.getBooksInCommand(newlist);
 }


 addOneBook(item:BookData) {
   this.bookService.addSelectedBook(item);
  let books = this.bookService.getSelectedBooks();
  
  this.selectedBooks = this.commandService.getBooksInCommand(books);
 }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
   // this.subscriptionCommd.unsubscribe();
  }

}
