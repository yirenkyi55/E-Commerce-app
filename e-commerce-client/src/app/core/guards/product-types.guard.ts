import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services';
import * as fromStore from 'src/app/core/store';

@Injectable({ providedIn: 'root' })
export class ProductTypesGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.ApplicationManagementState>,
    private spinnerService: SpinnerService
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore() {
    this.store.dispatch(fromStore.GetAllProductTypesRequest());

    return this.store.select(fromStore.getTypesLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.spinnerService.showSpinner();
        } else {
          this.spinnerService.closeSpinner();
        }
      }),
      // tap(() => {
      //   const contentParams = new ContentParams();
      //   this.store.dispatch(fromStore.GetAllContents({ contentParams }));
      // }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
