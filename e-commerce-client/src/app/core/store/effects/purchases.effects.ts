import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { ProductsService } from '../../services';
import * as fromPurchases from '../actions/purchases.actions';
import { of } from 'rxjs';
import * as fromHelpers from '../actions/helpers.actions';
import { NotificationType } from '../../models';

@Injectable()
export class PurchaseEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  getAllPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPurchases.GetAllPurchasesRequest),
      switchMap(() => {
        return this.productService.getAllPurchases().pipe(
          map((response) =>
            fromPurchases.GetAllPurchasesRequestSuccess({ response })
          ),
          catchError((error) =>
            of(fromPurchases.GetAllPurchasesRequestFailure(error))
          )
        );
      })
    )
  );

  toggleDeliveryStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPurchases.ToggleDeliveryRequest),
      switchMap(({ purchaseId }) => {
        return this.productService.togglePurchaseConfirm(purchaseId).pipe(
          switchMap((response) => [
            fromPurchases.ToggleDeliveryRequestSuccess({ response }),
            fromHelpers.DisplayNotification({
              notificationType: NotificationType.success,
              title: 'Purchase',
              message: 'Purchase status has been changed',
            }),
          ]),
          catchError((error) =>
            of(fromPurchases.ToggleDeliveryRequestFailure(error))
          )
        );
      })
    )
  );
}
