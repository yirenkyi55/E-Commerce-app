import { Logout } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services';
import * as fromAuthAction from '../actions';
import * as fromRoot from 'src/app/store';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.LoginRequest),
      switchMap((requestModel) =>
        this.authService.loginService(requestModel).pipe(
          map((response) => fromAuthAction.LoginRequestSuccess({ response })),
          catchError((error) => of(fromAuthAction.LoginRequestFailure(error)))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.LoginRequestSuccess),
      switchMap(({ response }) => [
        response?.roles?.includes('admin')
          ? fromRoot.Go({ path: ['/admin'] })
          : fromRoot.Go({ path: ['/'] }),
      ])
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.Logout),
      tap(() => {
        this.authService.logOut();
      }),
      map(() => fromRoot.Go({ path: ['/'] }))
    )
  );
}
