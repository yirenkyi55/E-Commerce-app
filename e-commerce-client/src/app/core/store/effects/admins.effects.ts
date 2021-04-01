import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { AdminService } from '../../services';
import * as fromAdmins from '../actions/admins.actions';
import { of } from 'rxjs';
import * as fromHelpers from '../actions/helpers.actions';
import { NotificationType } from '../../models';

@Injectable()
export class AdminsEffect {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  getAllAdmins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAdmins.GetAllAdminsRequest),
      switchMap(() => {
        return this.adminService.getAllAdmins().pipe(
          map((response) =>
            fromAdmins.GetAllAdminsRequestSuccess({ response })
          ),
          catchError((error) =>
            of(fromAdmins.GetAllAdminsRequestFailure(error))
          )
        );
      })
    )
  );

  createAdmins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAdmins.CreateAdminRequest),
      switchMap((adminModel) => {
        return this.adminService.createAdmin(adminModel).pipe(
          switchMap((response) => [
            fromAdmins.CreateAdminRequestSuccess({ response }),
            fromHelpers.DisplayNotification({
              notificationType: NotificationType.success,
              title: 'Create Admin',
              message: 'Admin has been successfully created',
            }),
          ]),
          catchError((error) => of(fromAdmins.CreateAdminRequestFailure(error)))
        );
      })
    )
  );

  getAllContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAdmins.GetAllContactsRequest),
      switchMap(() => {
        return this.adminService.getAllContacts().pipe(
          map((response) =>
            fromAdmins.GetAllContactsRequestSuccess({ response })
          ),
          catchError((error) =>
            of(fromAdmins.GetAllContactsRequestFailure(error))
          )
        );
      })
    )
  );

  createAbout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAdmins.CreateAboutRequest),
      switchMap((aboutModel) => {
        return this.adminService.createAbout(aboutModel).pipe(
          switchMap((response) => [
            fromAdmins.CreateAboutRequestSuccess({ response }),
            fromHelpers.DisplayNotification({
              notificationType: NotificationType.success,
              title: 'About',
              message: 'About has been successfully set',
            }),
          ]),
          catchError((error) => of(fromAdmins.CreateAboutRequestFailure(error)))
        );
      })
    )
  );

  getAbout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAdmins.GetAboutRequest),
      switchMap(() => {
        return this.adminService.getAbout().pipe(
          map((response) => fromAdmins.GetAboutRequestSuccess({ response })),
          catchError((error) => of(fromAdmins.GetAboutRequestFailure(error)))
        );
      })
    )
  );
}
