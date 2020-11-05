import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { ShopComponent } from 'src/app/shop/shop.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public nbSelectedBooks: number = 0;
  private subscription: Subscription;
  constructor(private router: Router, private bookService: BookService, public dialog: MatDialog) {
    this.subscription= this.bookService.getNbSelectedBooks().subscribe(
      data => this.nbSelectedBooks = data
    );
   }

  ngOnInit() {
    
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(ShopComponent);
    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    });
  }

  public inbookDetail(): boolean {
    return this.router.url.lastIndexOf('/details', 0) === 0;
  }

  public goListBooks() {
    this.router.navigate(['books']);
  }

  public showNbSelectedBooks() {
    

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
