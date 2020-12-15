import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailsComponent } from './books/book/book-details/book-details.component';
import { BooksListComponent } from './books/books-list.component';
import { BookDetailGuard } from './guard/book-detail-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksListComponent },
  { path: 'details',
  canActivate: [BookDetailGuard], component: BookDetailsComponent},

  { path: '**', redirectTo: 'books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
