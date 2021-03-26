import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { ProductTypesService } from '../../services';
import * as fromTypes from '../actions/product-types.actions';
import { of } from 'rxjs';

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
          map((productType) =>
            fromTypes.CreateProductTypeRequestSuccess({ productType })
          ),
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
          map((productType) =>
            fromTypes.UpdateProductTypeRequestSuccess({ productType })
          ),
          catchError((error) =>
            of(fromTypes.UpdateProductTypeRequestFailure(error))
          )
        );
      })
    )
  );
}
