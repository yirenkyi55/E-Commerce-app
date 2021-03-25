import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';

export interface AuthenticationState {
  auth: fromAuth.AuthenticationState;
}

export const reducers: ActionReducerMap<AuthenticationState> = {
  auth: fromAuth.reducer,
};

export const getAuthenticationState = createFeatureSelector<AuthenticationState>(
  'authState'
);
