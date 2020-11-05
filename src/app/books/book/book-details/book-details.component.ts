import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookData } from 'src/app/models/book-data';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  public bookItem: BookData | undefined;
  public array: BookData[];

  constructor(private activatedRoute: ActivatedRoute,
    private bookService: BookService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: BookData) => {
      let item = params;
      this.getBook(item);
    });
  }

  getBook(item: BookData): void {
    this.bookService.getBook(item).subscribe(
      data => {
        this.bookItem = data;
      },
      err => console.log('error in product detail..', err)
    )
  }

  public addBookToPanier(item: BookData) {
    if (item != undefined)
      this.bookService.addSelectedBook(item);
  }

  public trackByTextFn = (index: number, text: string) => text;
}
