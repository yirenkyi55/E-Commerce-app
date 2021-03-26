import { Action, createReducer, on } from '@ngrx/store';
import { NotificationMessage } from '../../models';
import * as fromHelpers from '../actions/helpers.actions';

export interface HelpersState {
  notification: NotificationMessage;
}

export const initialState: HelpersState = {
  notification: null,
};

const featureReducer = createReducer(
  initialState,
  on(fromHelpers.DisplayNotification, (state, notification) => {
    return {
      ...state,
      notification,
    };
  }),

  on(fromHelpers.CloseNotification, (state) => {
    return {
      ...state,
      notification: null,
    };
  })
);

export function reducer(
  state: HelpersState | undefined,
  action: Action
): HelpersState {
  return featureReducer(state, action);
}

export const getNotification = (state: HelpersState) => state.notification;
