import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromProducts from '../reducers/products.reducers';
import * as fromRoot from 'src/app/store';

export const getProductsState = createSelector(
  fromReducers.getApplicationState,
  (state) => state.products
);

export const getProductEntities = createSelector(
  getProductsState,
  fromProducts.getProductsEntities
);

export const getHomePageProducts = createSelector(
  getProductsState,
  fromProducts.getHomePageProducts
);

export const getProducts = createSelector(getProductEntities, (entities) =>
  Object.keys(entities).map((id) => entities[id])
);

export const getSelectedProduct = createSelector(
  getProductEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router?.state && entities[router.state.params.productId];
  }
);

export const getProductsLoading = createSelector(
  getProductsState,
  (state) => state.loading
);

export const getProductsLoaded = createSelector(
  getProductsState,
  (state) => state.loaded
);

export const getProductsPagination = createSelector(
  getProductsState,
  (state) => state.pagination
);
