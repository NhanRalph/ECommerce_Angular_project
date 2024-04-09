import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartCheckout, CartQuantity } from '../../services/cart/cart.service';

export const selectCartState =
  createFeatureSelector<CartQuantity>('cartQuantity');

export const checkoutCartState =
  createFeatureSelector<CartCheckout>('checkoutCart');

export const getCartState = createFeatureSelector<CartCheckout>('getCart');

export const selectCartQuantity = createSelector(
  selectCartState,
  (state: CartQuantity) => state.quantity
);

export const selectCheckoutCart = createSelector(
  checkoutCartState,
  (state: CartCheckout) => state.carts
);

export const selectCart = createSelector(
  getCartState,
  (state: CartCheckout) => state.carts
);
