import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromStore from 'src/app/auth/store';

@Injectable({
  providedIn: 'root',
})

// AdminGuard that gives access to only admins
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.AuthenticationState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authenticate(state);
  }

  authenticate(state?: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(fromStore.getCurrentUser).pipe(
      map((user) => {
        if (user && user?.roles?.includes('admin')) {
          return true;
        }

        this.router.navigate(['/home']);

        return false;
      })
    );
  }
}
