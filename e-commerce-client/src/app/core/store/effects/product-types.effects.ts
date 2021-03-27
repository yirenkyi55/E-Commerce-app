import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { ProductTypesService } from '../../services';
import * as fromTypes from '../actions/product-types.actions';
import * as fromHelpers from '../actions/helpers.actions';
import * as fromRoot from 'src/app/store';
import { of } from 'rxjs';
import { NotificationType } from '../../models';

@Injectable()
export class ProductTypeEffect {
  constructor(
    private actions$: Actions,
    private typeService: ProductTypesService
  ) {}

  getAllProductTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypes.GetAllProductTypesRequest),
      switchMap(() => {
        return this.typeService.getProductTypes().pipe(
          map((productTypes) =>
            fromTypes.GetAllProductTypesRequestSuccess({ productTypes })
          ),
          catchError((error) =>
            of(fromTypes.GetAllProductTypesRequestFailure(error))
          )
        );
      })
    )
  );

  getProductType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypes.GetProductTypeRequest),
      switchMap(({ id }) => {
        return this.typeService.getProductType(id).pipe(
          map((productType) =>
            fromTypes.GetProductTypeRequestSuccess({ productType })
          ),
          catchError((error) =>
            of(fromTypes.GetProductTypeRequestFailure(error))
          )
        );
      })
    )
  );

  createProductType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypes.CreateProductTypeRequest),
      switchMap(({ model }) => {
        return this.typeService.createProductType(model).pipe(
          switchMap((productType) => [
            fromTypes.CreateProductTypeRequestSuccess({ productType }),
            fromHelpers.DisplayNotification({
              notificationType: NotificationType.success,
              title: 'Product Type',
              message: 'Product Type has been created successfully',
            }),
          ]),
          catchError((error) =>
            of(fromTypes.CreateProductTypeRequestFailure(error))
          )
        );
      })
    )
  );

  updateProductType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypes.UpdateProductTypeRequest),
      switchMap(({ id, model }) => {
        return this.typeService.updateProductType(id, model).pipe(
          switchMap((productType) => [
            fromTypes.UpdateProductTypeRequestSuccess({ productType }),
            fromRoot.Go({ path: ['admin', 'types'] }),
            fromHelpers.DisplayNotification({
              notificationType: NotificationType.success,
              title: 'Product Type',
              message: 'Product Type has been updated successfully',
            }),
          ]),
          catchError((error) =>
            of(fromTypes.UpdateProductTypeRequestFailure(error))
          )
        );
      })
    )
  );
}
