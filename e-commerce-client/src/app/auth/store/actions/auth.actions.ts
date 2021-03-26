import { createAction, props } from '@ngrx/store';
import {
  AuthUserRequestResponse,
  LoginRequestModel,
} from 'src/app/core/models';

// Actions For Login Request
export const LoginRequest = createAction(
  '[Authentication] Login Request',
  props<LoginRequestModel>()
);

export const LoginRequestSuccess = createAction(
  '[Authentication] Login Request Success',
  props<{ response: AuthUserRequestResponse }>()
);

export const LoginRequestFailure = createAction(
  '[Authentication] Login Request Failure',
  props<any>()
);

// Refresh token request
export const RefreshTokenRequest = createAction(
  '[Authentication] Refresh Token Request',
  props<{ token: string }>()
);

export const RefreshTokenRequestSuccess = createAction(
  '[Authentication] Refresh Token Request Success',
  props<{ response: AuthUserRequestResponse }>()
);

export const RefreshTokenRequestFailure = createAction(
  '[Authentication] Refresh Token Request Failure',
  props<any>()
);

export const Logout = createAction('[Authentication] Log out');
