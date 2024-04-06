import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cart } from './cart.model';
import { AuthService } from '../auth/auth.service';

export interface CartQuantity {
  quantity: number;
}

export const initialCartQuantity: CartQuantity = {
  quantity: 0,
};

export interface CartCheckout {
  carts: Cart[];
}

export const initialCartList: CartCheckout = {
  carts: [],
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  user_id: number | null;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.user_id = this.auth.getUserId();
  }

  getQuantityInCart(): Observable<{ quantity: number }> {
    return this.http.get<{ quantity: number }>(
      'http://localhost:8080/quantity-in-cart'
    );
  }

  addToCart(product_id: number, quantity: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/add-to-cart', {
      user_id: this.user_id,
      product_id,
      quantity,
    });
  }

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`http://localhost:8080/cart/`).pipe(
      map((cartArray: any[]) => {
        return cartArray.map((cart) => ({
          product_id: cart.product_id,
          cart_id: cart.cart_id,
          product_name: cart.product_name,
          product_price: parseFloat(cart.product_price),
          quantity_in_cart: cart.quantity_in_cart,
          max_quantity: cart.max_quantity,
          total_price: parseFloat(cart.total_price),
          product_image: cart.img_path,
          checked: false,
        }));
      })
    );
  }

  updataCartQuantity(
    cart_id: number,
    product_id: number,
    quantity: number
  ): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/cart/update-quantity`, {
      cart_id,
      product_id,
      quantity,
    });
  }

  deleteCartItem(cart_id: number, product_id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/cart/delete-product/${cart_id}/${product_id}`
    );
  }
}
