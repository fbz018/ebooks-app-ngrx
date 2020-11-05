import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookData } from 'src/app/models/book-data';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit, OnChanges {
   @Input() item: BookData;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }

  imgBooKClicked(){
    this.router.navigate(['/details'],{ queryParams: this.item});
  }

}
