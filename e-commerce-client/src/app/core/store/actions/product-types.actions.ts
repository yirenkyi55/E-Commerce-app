import { createAction, props } from '@ngrx/store';
import { CreateProductTypeModel, ProductType } from '../../models';

// Get All Product types request
export const GetAllProductTypesRequest = createAction(
  '[Product Types] Get All Product Types'
);

export const GetAllProductTypesRequestSuccess = createAction(
  '[Product Types] Get All Product Types Success',
  props<{ productTypes: ProductType[] }>()
);

export const GetAllProductTypesRequestFailure = createAction(
  '[Product Types] Get All Product Types Failure',
  props<any>()
);

// Get a single product type
export const GetProductTypeRequest = createAction(
  '[Product Type] Get Product Type Request',
  props<{ id: string }>()
);

export const GetProductTypeRequestSuccess = createAction(
  '[Product Type] Get Product Type Request Success',
  props<{ productType: ProductType }>()
);

export const GetProductTypeRequestFailure = createAction(
  '[Product Type] Get Product Type Request Failure',
  props<any>()
);

// Creates a new product type requests
export const CreateProductTypeRequest = createAction(
  '[Product Type] Create Product Type Request',
  props<{ model: CreateProductTypeModel }>()
);

export const CreateProductTypeRequestSuccess = createAction(
  '[Product Type] Create Product Type Request Success',
  props<{ productType: ProductType }>()
);

export const CreateProductTypeRequestFailure = createAction(
  '[Product Type] Create Product Type Request Failure',
  props<any>()
);

//  Updates a product type request
export const UpdateProductTypeRequest = createAction(
  '[Product Type] Update Product Type Request',
  props<{ id: string; model: CreateProductTypeModel }>()
);

export const UpdateProductTypeRequestSuccess = createAction(
  '[Product Type] Update Product Type Request Success',
  props<{ productType: ProductType }>()
);

export const UpdateProductTypeRequestFailure = createAction(
  '[Product Type] Update Product Type Request Failure',
  props<any>()
);
