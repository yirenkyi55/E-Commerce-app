import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromTypes from '../reducers/product-types.reducers';
import * as fromRoot from 'src/app/store';

export const getTypeState = createSelector(
  fromReducers.getApplicationState,
  (state) => state.productTypes
);

export const getTypeEntities = createSelector(
  getTypeState,
  fromTypes.getProductTypesEntities
);

export const getTypes = createSelector(getTypeEntities, (entities) =>
  Object.keys(entities).map((id) => entities[id])
);

export const getSeletedType = createSelector(
  getTypeEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router?.state && entities[router.state.params.typeId];
  }
);

export const getTypesLoading = createSelector(
  getTypeState,
  fromTypes.getProductTypesLoading
);

export const getTypesLoaded = createSelector(
  getTypeState,
  fromTypes.getProductTypesLoaded
);
