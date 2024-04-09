import { createReducer, on } from '@ngrx/store';
import {
  initialCartQuantity,
  initialCartList,
} from '../../services/cart/cart.service';
import {
  getQuantityInCart,
  getQuantityInCartSuccess,
  checkoutCart,
  checkoutCartSuccess,
  getCart,
  getCartSuccess,
} from './cart.action';

export const cartReducer = createReducer(
  initialCartQuantity,
  on(getQuantityInCart, (state) => state),
  on(getQuantityInCartSuccess, (state, { quantity }) => ({
    ...state,
    quantity: quantity,
  }))
);
export const getCartReducer = createReducer(
  initialCartList,
  on(getCart, (state) => state),
  on(getCartSuccess, (state, { carts }) => ({ ...state, carts: carts }))
);

export const checkoutCartReducer = createReducer(
  initialCartList,
  on(checkoutCart, (state, { carts }) => ({ ...state, carts: carts })),
  on(checkoutCartSuccess, (state, { carts }) => ({ ...state, carts: carts }))
);
