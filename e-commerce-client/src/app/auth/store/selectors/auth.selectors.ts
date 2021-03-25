import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromAuthentication from '../reducers/auth.reducers';

// Generates a selector for the login state based on the authentication state
export const getAuthState = createSelector(
  fromReducers.getAuthenticationState,
  (state: fromReducers.AuthenticationState) => state.auth
);

export const getCurrentUser = createSelector(
  getAuthState,
  fromAuthentication.getCurrentUserEntity
);

// Generates a selector for loading based on the login state
export const getAuthLoading = createSelector(
  getAuthState,
  fromAuthentication.getAuthLoading
);

// Generates a selector for loaded based on the login state
export const getAuthLoaded = createSelector(
  getAuthState,
  fromAuthentication.getAuthLoaded
);

// Generates a selector for dashboard selector
export const getDashboardType = createSelector(
  getAuthState,
  fromAuthentication.getDashboardType
);

export const getAuthenticateRequest = createSelector(
  getAuthState,
  fromAuthentication.getAuthenticateState
);
