import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProducts from './products.reducers';
import * as fromBrands from './product-brands.reducers';
import * as fromTypes from './product-types.reducers';
import * as fromHelpers from './helpers.reducers';
import * as fromPurchases from './purchase.reducers';
import * as fromAdmins from './admins.reducers';

export interface ApplicationManagementState {
  products: fromProducts.ProductsState;
  productBrands: fromBrands.ProductBrandState;
  productTypes: fromTypes.ProductTypesState;
  helpers: fromHelpers.HelpersState;
  purchases: fromPurchases.PurchaseState;
  admins: fromAdmins.AdminState;
}

export const reducers: ActionReducerMap<ApplicationManagementState> = {
  products: fromProducts.reducer,
  productBrands: fromBrands.reducer,
  productTypes: fromTypes.reducer,
  helpers: fromHelpers.reducer,
  purchases: fromPurchases.reducer,
  admins: fromAdmins.reducer,
};

export const getApplicationState = createFeatureSelector<ApplicationManagementState>(
  'applicationState'
);
