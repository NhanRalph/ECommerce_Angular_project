import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartCheckout, CartQuantity } from '../../services/cart/cart.service';

export const selectCartState =
  createFeatureSelector<CartQuantity>('cartQuantity');

export const checkoutCartState =
  createFeatureSelector<CartCheckout>('checkoutCart');

export const selectCartQuantity = createSelector(
  selectCartState,
  (state: CartQuantity) => state.quantity
);

export const selectCheckoutCart = createSelector(
  checkoutCartState,
  (state: CartCheckout) => state.carts
);
