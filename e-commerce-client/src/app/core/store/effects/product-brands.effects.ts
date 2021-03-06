import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { ProductBrandsService } from '../../services';
import * as fromBrands from '../actions/product-brands.actions';
import * as fromHelpers from '../actions/helpers.actions';
import { of } from 'rxjs';
import { NotificationType } from '../../models';
@Injectable()
export class ProductBrandsEffect {
  constructor(
    private actions$: Actions,
    private brandService: ProductBrandsService
  ) {}

  getBrandsForType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBrands.GetAllBrandsForTypeRequest),
      switchMap(({ typeId }) => {
        return this.brandService.getProductBrands(typeId).pipe(
          map((brands) =>
            fromBrands.GetAllBrandsForTypeRequestSuccess({ typeId, brands })
          ),
          catchError((error) =>
            of(fromBrands.GetAllBrandsForTypeRequestFailure(error))
          )
        );
      })
    )
  );

  createBrandsForType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBrands.CreateProductBrandRequest),
      switchMap(({ typeId, brand }) => {
        return this.brandService.createProductBrand(typeId, brand).pipe(
          switchMap((productBrand) => [
            fromBrands.CreateProductBrandRequestSuccess({
              typeId,
              brand: productBrand,
            }),
            fromHelpers.DisplayNotification({
              notificationType: NotificationType.success,
              title: 'Product Brands',
              message: 'Brand has been created successfully',
            }),
          ]),
          catchError((error) =>
            of(fromBrands.CreateProductBrandRequestFailure(error))
          )
        );
      })
    )
  );

  updateBrandsForType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBrands.UpdateProductBrandRequest),
      switchMap(({ typeId, brandId, brand }) => {
        return this.brandService
          .updateProductBrand(typeId, brandId, brand)
          .pipe(
            switchMap((productBrand) => [
              fromBrands.UpdateProductBrandRequestSuccess({
                typeId,
                brand: productBrand,
              }),

              fromHelpers.DisplayNotification({
                notificationType: NotificationType.success,
                title: 'Product Brands',
                message: 'Brand has been updated successfully',
              }),
            ]),
            catchError((error) =>
              of(fromBrands.UpdateProductBrandRequestFailure(error))
            )
          );
      })
    )
  );
}
