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

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.CreateAccountRequest),
      switchMap((requestModel) =>
        this.authService.createAccount(requestModel).pipe(
          map((response) =>
            fromAuthAction.CreateAccountRequestSuccess({ response })
          ),
          catchError((error) =>
            of(fromAuthAction.CreateAccountRequestFailure(error))
          )
        )
      )
    )
  );

  createAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.CreateAccountRequestSuccess),
      switchMap(() => [fromRoot.Go({ path: ['/shop/checkout'] })])
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.LoginRequestSuccess),
      switchMap(({ response }) => [
        response?.roles?.includes('admin')
          ? fromRoot.Go({ path: ['/admin'] })
          : fromRoot.NoWork(),
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

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.RefreshTokenRequest),
      switchMap(({ token }) => {
        if (!token) {
          return of(fromAuthAction.RefreshTokenRequestFailure('error'));
        }
        return this.authService.refreshToken({ token }).pipe(
          map((response) =>
            fromAuthAction.RefreshTokenRequestSuccess({ response })
          ),
          catchError((error) =>
            of(fromAuthAction.RefreshTokenRequestFailure(error))
          )
        );
      })
    )
  );
}
