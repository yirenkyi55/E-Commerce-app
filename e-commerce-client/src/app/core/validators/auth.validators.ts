import { AsyncValidatorFn, FormGroup } from '@angular/forms';
import { timer, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services';

export class AuthValidator {
  // Validate the email
  static validateEmail(
    authService: AuthService,
    email: string = null
  ): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            // If there is no value in the control, we don't make request to the api
            return of(null);
          } else if (email !== null && email === control.value) {
            return of(null); // if the typed in email is the same as the email stored in the store,
            // the user can update his/her profile and we don't have to make request to the api
          }

          return authService.checkEmailExistence(control.value).pipe(
            map((response) => {
              return response ? { emailExists: true } : null;
            }),
            catchError(() => {
              return of(null);
            })
          );
        })
      );
    };
  }
}
