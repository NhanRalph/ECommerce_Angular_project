import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import {
  checkoutCart,
  checkoutCartSuccess,
  getQuantityInCart,
  getQuantityInCartSuccess,
} from './cart.action';

@Injectable()
export class CartEffect {
  constructor(private actions$: Actions, private cartService: CartService) {}

  getQuantityInCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getQuantityInCart),
      mergeMap(() =>
        this.cartService
          .getQuantityInCart()
          .pipe(
            map((cart) => getQuantityInCartSuccess({ quantity: cart.quantity }))
          )
      )
    )
  );

  checkoutCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutCart),
      map((action) => checkoutCartSuccess({ carts: action.carts }))
    )
  );
}
