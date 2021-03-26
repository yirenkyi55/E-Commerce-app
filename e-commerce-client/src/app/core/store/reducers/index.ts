import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProducts from './products.reducers';
import * as fromBrands from './product-brands.reducers';
import * as fromTypes from './product-types.reducers';

export interface ApplicationManagementState {
  products: fromProducts.ProductsState;
  productBrands: fromBrands.ProductBrandState;
  productTypes: fromTypes.ProductTypesState;
}

export const reducers: ActionReducerMap<ApplicationManagementState> = {
  products: fromProducts.reducer,
  productBrands: fromBrands.reducer,
  productTypes: fromTypes.reducer,
};

export const getApplicationState = createFeatureSelector<ApplicationManagementState>(
  'applicationState'
);
