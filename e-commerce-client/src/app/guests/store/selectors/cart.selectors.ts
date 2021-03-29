import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromCart from '../reducers/cart.reducers';

export const getCartState = createSelector(
  fromReducers.getGuestState,
  (state) => state.carts
);

export const getCartItems = createSelector(getCartState, fromCart.getCartItems);

export const getCheckoutState = createSelector(
  getCartState,
  fromCart.getCheckoutState
);
