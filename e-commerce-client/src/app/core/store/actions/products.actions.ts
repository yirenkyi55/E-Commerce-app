import { createAction, props } from '@ngrx/store';
import { PaginationResult, Product, ProductParams } from 'src/app/core/models';

// Request to Get All Products
export const GetProductsRequest = createAction(
  '[Products] Get Products Request',
  props<{ params: ProductParams }>()
);

export const GetProductsRequestSuccess = createAction(
  '[Products] Get Products Request Success',
  props<{ response: PaginationResult<Product[]> }>()
);

export const GetProductsRequestError = createAction(
  '[Products] Get Products Request Error',
  props<any>()
);

// Request to Create a New Product
export const CreateProductRequest = createAction(
  '[Products] Create Product Request',
  props<{ productForm: FormData }>()
);

export const CreateProductRequestSuccess = createAction(
  '[Products] Create Product Request Success',
  props<{ product: Product }>()
);

export const CreateProductRequestFail = createAction(
  '[Products] Create Product Request Fail',
  props<any>()
);

// Request To Get A single product
export const GetProductRequest = createAction(
  '[Products] Get Product Request',
  props<{ productId: string }>()
);

export const GetProductRequestSuccess = createAction(
  '[Products] Get Product Request Success',
  props<{ product: Product }>()
);

export const GetProductRequestFailure = createAction(
  '[Products] Get Product Request Failure',
  props<any>()
);

// Updates a product
export const UpdateProductRequest = createAction(
  '[Products] Update Product Request',
  props<{ productId: string; productForm: FormData }>()
);

export const UpdateProductRequestSuccess = createAction(
  '[Products] Update Product Request Success',
  props<{ product: Product }>()
);

export const UpdateProductRequestFailure = createAction(
  '[Products] Update Product Request Failure',
  props<any>()
);

// Deletes a product
export const DeleteProductRequest = createAction(
  '[Products] Deletes Product Request',
  props<{ productId: string }>()
);

export const DeleteProductRequestSuccess = createAction(
  '[Products] Deletes Product Request Success',
  props<{ productId: string }>()
);

export const DeleteProductRequestFailure = createAction(
  '[Products] Deletes Product Request Failure',
  props<any>()
);
