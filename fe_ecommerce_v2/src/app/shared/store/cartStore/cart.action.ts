import { createAction, props } from '@ngrx/store';
import { Cart } from '../../services/cart/cart.model';

export const getQuantityInCart = createAction('[Cart] Get Quantity In Cart');
export const getQuantityInCartSuccess = createAction(
  '[Cart] Get Quantity In Cart Success',
  props<{ quantity: number }>()
);

export const checkoutCart = createAction(
  '[Cart] Checkout Cart',
  props<{ carts: Cart[] }>()
);
export const checkoutCartSuccess = createAction(
  '[Cart] Checkout Cart Success',
  props<{ carts: Cart[] }>()
);

export const getCart = createAction('[Cart] Get Cart');
export const getCartSuccess = createAction(
  '[Cart] Get  Cart Success',
  props<{ carts: Cart[] }>()
);
