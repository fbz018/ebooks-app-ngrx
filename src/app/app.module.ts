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
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { BooksListEffects } from './effects/books.effect';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


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
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([BooksListEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  entryComponents: [
    ShopComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
