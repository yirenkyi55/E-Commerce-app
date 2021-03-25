import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromStore from 'src/app/auth/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
        if (user) {
          return true;
        }
        // dispatch an action to login
        this.router.navigate(['/']);

        // if (state) {
        //   this.router.navigate(['/'], {
        //     queryParams: { returnUrl: state?.url },
        //   });
        // } else {
        //   this.router.navigate(['/auth/login']);
        // }

        return false;
      })
    );
  }
}
