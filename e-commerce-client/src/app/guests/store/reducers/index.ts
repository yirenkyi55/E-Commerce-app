import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCartReducer from './cart.reducers';

export interface GuestState {
  carts: fromCartReducer.CartState;
}

export const reducers: ActionReducerMap<GuestState> = {
  carts: fromCartReducer.reducer,
};

export const getGuestState = createFeatureSelector<GuestState>('guestState');
