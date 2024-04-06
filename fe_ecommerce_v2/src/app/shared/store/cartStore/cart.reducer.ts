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
} from './cart.action';

export const cartReducer = createReducer(
  initialCartQuantity,
  on(getQuantityInCart, (state) => state),
  on(getQuantityInCartSuccess, (state, { quantity }) => ({
    ...state,
    quantity: quantity,
  }))
);

export const checkoutCartReducer = createReducer(
  initialCartList,
  on(checkoutCart, (state, { carts }) => ({ ...state, carts: carts })),
  on(checkoutCartSuccess, (state, { carts }) => ({ ...state, carts: carts }))
);
