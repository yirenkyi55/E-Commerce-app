import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromPurchases from '../reducers/purchase.reducers';
import * as fromRoot from 'src/app/store';

export const getPurchaseState = createSelector(
  fromReducers.getApplicationState,
  (state) => state.purchases
);

export const getPurchaseEntities = createSelector(
  getPurchaseState,
  fromPurchases.getPurchaseEntities
);

export const getPurchases = createSelector(getPurchaseEntities, (entities) =>
  Object.keys(entities).map((id) => entities[id])
);

export const getSelectedPurchases = createSelector(
  getPurchaseEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router?.state && entities[router.state.params.purchaseId];
  }
);

export const getPurchaseLoading = createSelector(
  getPurchaseState,
  fromPurchases.getPurchaseLoading
);

export const getPurchaseLoaded = createSelector(
  getPurchaseState,
  fromPurchases.getPurchaseLoaded
);
