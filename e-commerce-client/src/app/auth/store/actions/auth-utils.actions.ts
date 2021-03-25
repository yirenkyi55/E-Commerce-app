import { createAction, props } from '@ngrx/store';

// Actions For Login Request
export const AuthenticateRequest = createAction(
  '[Authentication] Authenticate Request',
  props<{ value: boolean }>()
);
