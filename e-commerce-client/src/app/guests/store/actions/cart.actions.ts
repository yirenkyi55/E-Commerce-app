import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/core/models';

export const AddToCart = createAction('[Cart] Add To Cart', props<CartItem>());

export const RemoveFromCart = createAction(
  '[Cart] Remove From Cart',
  props<CartItem>()
);

export const ClearCartItem = createAction(
  '[Cart] Clear Cart Item',
  props<CartItem>()
);

export const ClearAllCartItems = createAction('[Cart] Clear All Cart Items');

export const CheckoutRequest = createAction('[Cart] Check Out Request');

export const CheckOutRequestSuccess = createAction(
  '[Cart] Checkout Request Success'
);
