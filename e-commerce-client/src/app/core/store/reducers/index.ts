import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProducts from './products.reducers';
import * as fromBrands from './product-brands.reducers';
import * as fromTypes from './product-types.reducers';
import * as fromHelpers from './helpers.reducers';
import * as fromPurchases from './purchase.reducers';

export interface ApplicationManagementState {
  products: fromProducts.ProductsState;
  productBrands: fromBrands.ProductBrandState;
  productTypes: fromTypes.ProductTypesState;
  helpers: fromHelpers.HelpersState;
  purchases: fromPurchases.PurchaseState;
}

export const reducers: ActionReducerMap<ApplicationManagementState> = {
  products: fromProducts.reducer,
  productBrands: fromBrands.reducer,
  productTypes: fromTypes.reducer,
  helpers: fromHelpers.reducer,
  purchases: fromPurchases.reducer,
};

export const getApplicationState = createFeatureSelector<ApplicationManagementState>(
  'applicationState'
);
