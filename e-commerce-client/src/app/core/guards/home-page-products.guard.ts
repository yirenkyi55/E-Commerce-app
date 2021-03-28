import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services';
import * as fromStore from 'src/app/core/store';
import { ProductParams } from '../models';

@Injectable({ providedIn: 'root' })
export class HomePageProductsGuard implements CanActivate {
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
    const params = new ProductParams();
    this.store.dispatch(fromStore.GetHomePageProductsRequest({ params }));

    return this.store.select(fromStore.getProductsLoaded).pipe(
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
