import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookData } from '../models/book-data';

@Injectable({
    providedIn: 'root'
})
export class BookDetailGuard implements CanActivate {

    constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

    canActivate(next: ActivatedRouteSnapshot) {
       const item= next.params;
          if (!(item as BookData)) {
            alert('Invalid book');
            this.router.navigate(['/books']);
            return false;
        } else {
            return true;
        }
        
    }
}
