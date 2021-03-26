import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services';
import * as fromAppStore from 'src/app/core/store';
import { Store } from '@ngrx/store';
import { NotificationType } from '../models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromAppStore.ApplicationManagementState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const message: string = error.error?.errors?.message;

        if (error) {
          console.log(error);
          if (error.status === 500) {
          } else if (error.status === 400) {
            this.store.dispatch(
              fromAppStore.DisplayNotification({
                notificationType: NotificationType.error,
                title: 'Bad Request',
                message,
              })
            );
          } else if (error.status === 401) {
            if (typeof message !== 'object') {
              this.store.dispatch(
                fromAppStore.DisplayNotification({
                  notificationType: NotificationType.error,
                  title: 'Unauthorized',
                  message,
                })
              );
            }
          } else if (error.status === 404) {
            this.store.dispatch(
              fromAppStore.DisplayNotification({
                notificationType: NotificationType.error,
                title: 'Not Found',
                message,
              })
            );
          } else if (error.status === 422) {
            this.store.dispatch(
              fromAppStore.DisplayNotification({
                notificationType: NotificationType.error,
                title: 'One or more validations occured',
                message: error.error?.errors?.join('\n'),
              })
            );
          } else if (error.status === 403) {
            this.store.dispatch(
              fromAppStore.DisplayNotification({
                notificationType: NotificationType.error,
                title: 'Access Denied',
                message,
              })
            );
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
