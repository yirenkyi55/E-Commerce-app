import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromHelpers from '../reducers/helpers.reducers';

export const getHelperState = createSelector(
  fromReducers.getApplicationState,
  (state) => state.helpers
);

export const getNotification = createSelector(
  getHelperState,
  fromHelpers.getNotification
);
