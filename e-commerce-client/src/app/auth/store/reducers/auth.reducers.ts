import { Action, createReducer, on } from '@ngrx/store';
import { DashboardTypes } from 'src/app/core/enums';
import { AuthUserRequestResponse } from 'src/app/core/models';
import * as authActions from '../actions';

export interface AuthenticationState {
  currentUser: AuthUserRequestResponse;
  loading: boolean;
  loaded: boolean;
  dashboard: DashboardTypes;
  authenticate: boolean;
}

export const initialState: AuthenticationState = {
  currentUser: null,
  loading: false,
  loaded: false,
  dashboard: DashboardTypes.Guest,
  authenticate: false,
};

const featureReducer = createReducer(
  initialState,
  on(authActions.LoginRequest, authActions.RefreshTokenRequest, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    authActions.LoginRequestSuccess,
    authActions.RefreshTokenRequestSuccess,
    (state, { response }) => {
      const currentUser = response;
      const dashboard = response.roles?.includes('admin')
        ? DashboardTypes.Admin
        : DashboardTypes.Guest;

      return {
        ...state,
        loading: false,
        loaded: true,
        currentUser,
        dashboard,
      };
    }
  ),

  on(authActions.AuthenticateRequest, (state, { value }) => ({
    ...state,
    authenticate: value,
  })),

  on(authActions.Logout, (state) => {
    return {
      ...state,
      currentUser: null,
      dashboard: DashboardTypes.Guest,
    };
  }),

  on(
    authActions.LoginRequestFailure,
    authActions.RefreshTokenRequestFailure,
    (state) => ({
      ...state,
      loading: false,
      loaded: false,
    })
  )
);

export function reducer(
  state: AuthenticationState | undefined,
  action: Action
): AuthenticationState {
  return featureReducer(state, action);
}

export const getCurrentUserEntity = (state: AuthenticationState) =>
  state.currentUser;
export const getAuthLoading = (state: AuthenticationState) => state.loading;
export const getAuthLoaded = (state: AuthenticationState) => state.loaded;
export const getDashboardType = (state: AuthenticationState) => state.dashboard;
export const getAuthenticateState = (state: AuthenticationState) =>
  state.authenticate;
