import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuthStore from 'src/app/auth/store';
import { AuthService } from 'src/app/auth/services';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  // Refresh token subject tracks the current token, or is null if no token is currently available (eg. refresh pending)
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(
    private store: Store<fromAuthStore.AuthenticationState>,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.status === 401) {
            // We need to log the user out, since he/she is unauthorized
            // implement, refresh token functionality if token exists
            // we don't want to implement refresh token for some request like login and refresh
            const authWishListRequest = ['auth/password'];

            let found =
              authWishListRequest.filter((url) => req.url.includes(url))
                .length > 0;

            if (req.url.includes('auth') && !found) {
              // We do another check to see if request was a refresh token
              // request meaning refresh token actually fails
              if (req.url.includes('refresh')) {
                // We need to log the users out
                // this.toastrService.warning(
                //   'Session authentication failed',
                //   'Unauthorized'
                // );
                this.store.dispatch(fromAuthStore.Logout());
                return throwError(error);
              }

              // if the request is a login request or any other auth request,
              // we don't want to refresh the token since the request already allows anonymous users
              return throwError(error);
            }

            if (this.refreshTokenInProgress) {
              // if refreshTokenInProgress is true, we will wait until refreshTokenSubject
              // has a non null value, which means the new token is ready and we can try the request
              // again
              return this.refreshTokenSubject.pipe(
                filter((result) => result !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req)))
              );
            } else {
              this.refreshTokenInProgress = true;
              // Set the refreshTokenSubject to null so that
              // subsequent API calls will wait until the new token has been retrieved
              this.refreshTokenSubject.next(null);
              // Call auth.refreshAccessToken(this is an Observable that will be returned)
              return this.authService
                .refreshToken({ token: this.authService.getToken() })
                .pipe(
                  switchMap((user) => {
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(user);
                    // dispatch an action for refresh token success
                    this.store.dispatch(
                      fromAuthStore.RefreshTokenRequestSuccess({
                        response: user,
                      })
                    );
                    return next.handle(this.addAuthenticationToken(req));
                  }),
                  catchError((error) => {
                    this.store.dispatch(
                      fromAuthStore.RefreshTokenRequestFailure(error)
                    );
                    this.refreshTokenInProgress = false;
                    this.store.dispatch(fromAuthStore.Logout());
                    return Observable.throw(error);
                  })
                );
            }
            // We can refresh the token over here
          }
        }
        return throwError(error);
      })
    );
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    // Get access token from Local Storage
    const accessToken = this.authService.getToken();
    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }
}
