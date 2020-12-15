import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { BookData } from '../models/book-data';
@Injectable({
    providedIn: 'root'
})
export class BookDetailGuard implements CanActivate {

    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    canActivate(next: ActivatedRouteSnapshot): boolean {
       const item = next.params;
       if (!(item as BookData)) {
            this.router.navigate(['/books']);
            return false;
        } else {
            return true;
        }
    }
}
