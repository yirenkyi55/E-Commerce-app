import { createAction, props } from '@ngrx/store';
import { CreateProductBrandModel, ProductBrand } from '../../models';

// Get All Brands For Type
export const GetAllBrandsForTypeRequest = createAction(
  '[Product Brands] Get All Brands For Type',
  props<{ typeId: string }>()
);

export const GetAllBrandsForTypeRequestSuccess = createAction(
  '[Product Brands] Get All Brands For Type Success',
  props<{ typeId: string; brands: ProductBrand[] }>()
);

export const GetAllBrandsForTypeRequestFailure = createAction(
  '[Product Brands] Get All Brands For Type Failure',
  props<any>()
);

// Create Product Brand Request
export const CreateProductBrandRequest = createAction(
  '[Product Brand] Create Product Brand Request',
  props<{ typeId: string; brand: CreateProductBrandModel }>()
);

export const CreateProductBrandRequestSuccess = createAction(
  '[Product Brand] Create Product Brand Request Success',
  props<{ typeId: string; brand: ProductBrand }>()
);

export const CreateProductBrandRequestFailure = createAction(
  '[Product Brand] Create Product Brand Request Failure',
  props<any>()
);

export const UpdateProductBrandRequest = createAction(
  '[Product Brand] Update Product Brand Request',
  props<{ typeId: string; brandId: string; brand: CreateProductBrandModel }>()
);

export const UpdateProductBrandRequestSuccess = createAction(
  '[Product Brand] Update Product Brand Request Success',
  props<{ typeId: string; brand: ProductBrand }>()
);

export const UpdateProductBrandRequestFailure = createAction(
  '[Product Brand] Update Product Brand Request Failure',
  props<any>()
);
