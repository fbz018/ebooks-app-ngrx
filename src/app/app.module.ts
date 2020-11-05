import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books/books-list.component';
import { BookComponent } from './books/book/book.component';
import { MaterialModule } from './material/material.module';
import { BookDetailsComponent } from './books/book/book-details/book-details.component';
import { ShopComponent } from './shop/shop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import { TruncatePipe } from './pipes/TruncatePipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookComponent,
    BookDetailsComponent,
    ShopComponent,
    HeaderComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule ,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [
    ShopComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
