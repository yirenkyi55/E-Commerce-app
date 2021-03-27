import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromBrands from '../reducers/product-brands.reducers';
import * as fromRoot from 'src/app/store';

export const getBrandState = createSelector(
  fromReducers.getApplicationState,
  (state) => state.productBrands
);

export const getBrandEntities = createSelector(
  getBrandState,
  fromBrands.getBrandsEntities
);

export const getSelectedBrands = createSelector(
  getBrandEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router?.state && entities[router.state.params.typeId];
  }
);

export const getBrandsFromType = createSelector(
  getBrandEntities,
  (entities, props) => {
    return entities[props.typeId];
  }
);

export const getBrandsLoading = createSelector(
  getBrandState,
  fromBrands.getBrandsLoading
);

export const getBrandsLoaded = createSelector(
  getBrandState,
  fromBrands.getBrandsLoaded
);
