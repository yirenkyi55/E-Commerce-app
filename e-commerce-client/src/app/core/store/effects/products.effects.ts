import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/models';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { ProductsService } from '../../services';
import * as fromProducts from '../actions/products.actions';
import { of } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as fromHelpers from '../actions/helpers.actions';

@Injectable()
export class ProductsEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProducts.GetProductsRequest),
      switchMap(({ params }) => {
        return this.productService.getProducts(params).pipe(
          map((response) =>
            fromProducts.GetProductsRequestSuccess({ response })
          ),
          catchError((error) =>
            of(fromProducts.GetProductsRequestFailure(error))
          )
        );
      })
    )
  );

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProducts.GetProductRequest),
      switchMap(({ productId }) =>
        this.productService.getProduct(productId).pipe(
          map((product) => fromProducts.GetProductRequestSuccess({ product })),
          catchError((error) =>
            of(fromProducts.GetProductRequestFailure(error))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProducts.CreateProductRequest),
      concatMap(({ productForm }) => {
        return this.productService.createProduct(productForm).pipe(
          switchMap((event) => this.getActionFromHttpEvent(event)),
          catchError((error) =>
            of(fromProducts.CreateProductRequestSuccess(error))
          )
        );
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProducts.UpdateProductRequest),
      concatMap(({ productForm, productId }) => {
        return this.productService.updateProduct(productId, productForm).pipe(
          switchMap((event) => this.getActionFromHttpEvent(event, true)),
          catchError((error) =>
            of(fromProducts.UpdateProductRequestFailure(error))
          )
        );
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProducts.DeleteProductRequest),
      concatMap(({ productId }) => {
        return this.productService.deleteProduct(productId).pipe(
          map(() => fromProducts.DeleteProductRequestSuccess({ productId })),
          catchError((error) =>
            of(fromProducts.DeleteProductRequestFailure(error))
          )
        );
      })
    )
  );

  private getActionFromHttpEvent(event: HttpEvent<Product>, updated = false) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return [fromHelpers.UploadStartedAction()];
      }
      case HttpEventType.UploadProgress: {
        return [
          fromHelpers.UploadProgressAction({
            progress: Math.round((100 * event.loaded) / event.total),
          }),
        ];
      }
      case HttpEventType.Response: {
        // event.body is a pageContent and we can use that one to dispatch
        const product = event.body;
        return [
          updated
            ? fromProducts.UpdateProductRequestSuccess({ product })
            : fromProducts.CreateProductRequestSuccess({ product }),
        ];
      }

      case HttpEventType.ResponseHeader: {
        if (event.status !== 201 && event.status !== 200) {
          return [
            fromHelpers.UploadFailureAction({
              error: `Unknown Event: ${JSON.stringify(event)}`,
            }),
          ];
        }

        break;
      }

      case HttpEventType.DownloadProgress: {
        return [fromHelpers.UploadCompletedAction()];
      }
      default: {
        return [
          fromHelpers.UploadFailureAction({
            error: `Unknown Event: ${JSON.stringify(event)}`,
          }),
        ];
      }
    }
  }
}
