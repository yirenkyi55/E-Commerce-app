import { createReducer, on, Action } from '@ngrx/store';
import { CartItem } from 'src/app/core/models';
import * as fromCart from '../actions/cart.actions';

export interface CartState {
  cartItems: CartItem[];
  checkOut: boolean;
}

export const initialState: CartState = {
  cartItems: [],
  checkOut: false,
};

const featureReducer = createReducer(
  initialState,

  on(fromCart.AddToCart, (state, cart) => {
    let cartItems = [...state.cartItems];
    const existingCartItem = cartItems.find((item) => item.id === cart.id);

    if (existingCartItem) {
      cartItems = cartItems.map((cartItem) =>
        cartItem.id === cart.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      cartItems = [...cartItems, { ...cart, quantity: 1 }];
    }

    return {
      ...state,
      cartItems,
    };
  }),

  on(fromCart.RemoveFromCart, (state, cart) => {
    let cartItems = [...state.cartItems];

    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cart.id
    );

    if (existingCartItem.quantity === 1) {
      cartItems = cartItems.filter((item) => item.id !== cart.id);
    } else {
      cartItems = cartItems.map((cartItem) =>
        cartItem.id === cart.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }

    return {
      ...state,
      cartItems,
    };
  }),

  on(fromCart.ClearCartItem, (state, cart) => {
    const cartItems = [...state.cartItems].filter(
      (cartItem) => cartItem.id !== cart.id
    );
    return {
      ...state,
      cartItems,
    };
  }),

  on(fromCart.ClearAllCartItems, (state) => {
    return {
      ...state,
      cartItems: [],
    };
  }),

  on(fromCart.CheckoutRequest, (state) => {
    return {
      ...state,
      checkOut: true,
    };
  }),

  on(fromCart.CheckOutRequestSuccess, (state) => {
    return {
      ...state,
      checkOut: false,
    };
  })
);

export function reducer(
  state: CartState | undefined,
  action: Action
): CartState {
  return featureReducer(state, action);
}

export const getCartItems = (state: CartState) => state.cartItems;
export const getCheckoutState = (state: CartState) => state.checkOut;
