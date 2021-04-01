import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import * as fromStore from 'src/app/core/store';

@Injectable({
  providedIn: 'root',
})
export class SystemAdminGuard implements CanActivate {
  constructor(private store: Store<fromStore.ApplicationManagementState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore() {
    this.store.dispatch(fromStore.GetAllAdminsRequest());

    return this.store.select(fromStore.getAdminsLoaded).pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }
}
