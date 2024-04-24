import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Address } from 'src/app/shared/services/address/address.model';
import { Cart } from '../cart/cart.model';
import { map, mergeMap } from 'rxjs/operators';
import { OrderHistory, OrderHistoryDetails } from './order.modal';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  user_id!: number | null;
  constructor(private http: HttpClient, private auth: AuthService) {}

  checkout(address: Address, cartItems: Cart[]): Observable<any> {
    const user_id = address.user_id;

    // Delete products from the cart
    const deleteObservables = cartItems.map((item) =>
      this.deleteProductFromCart(item.cart_id, item.product_id)
    );

    // Update product quantities
    const updateObservables = cartItems.map((item) =>
      this.updateProductQuantity(item.product_id, item.quantity_in_cart)
    );

    // Execute all delete and update observables in parallel
    return forkJoin([
      forkJoin(deleteObservables), // Delete products from the cart
      forkJoin(updateObservables), // Update product quantities
    ]).pipe(
      mergeMap(() => {
        // Perform the order placement
        const orderData = {
          user_id: user_id,
          total_amount: this.calculateTotalAmount(cartItems),
          shipping_address_id: address.address_id, // Assuming address_id is present in the address model
          cartItems: cartItems,
        };
        return this.http.post<any>(
          'http://localhost:8080/order/add',
          orderData
        );
      })
    );
  }

  calculateTotalAmount(cartItems: Cart[]): number {
    return cartItems.reduce(
      (total, item) => total + item.quantity_in_cart * item.product_price,
      0
    );
  }

  deleteProductFromCart(cart_id: number, product_id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/cart/delete-product/${cart_id}/${product_id}`
    );
  }

  updateProductQuantity(product_id: number, quantity: number): Observable<any> {
    return this.http.patch<any>(
      `http://localhost:8080/product/update-quantity/${product_id}`,
      { quantity }
    );
  }

  getHistoryOrders(): Observable<OrderHistory[]> {
    this.user_id = this.auth.getUserId();
    return this.http
      .get<OrderHistory[]>(
        `http://localhost:8080/order/history/${this.user_id}`
      )
      .pipe(
        map((orders: OrderHistory[]) => {
          return orders.map((order: OrderHistory) => ({
            order_id: order.order_id,
            order_date: order.order_date,
            total_amount: order.total_amount,
            address: order.address,
            city: order.city,
            country: order.country,
            client_name: order.client_name,
            client_phone: order.client_phone,
            listOrderDetail: [],
          }));
        })
      );
  }

  getHistoryOrderDetails(order_id: number): Observable<OrderHistoryDetails[]> {
    this.user_id = this.auth.getUserId();
    return this.http
      .get<OrderHistoryDetails[]>(
        `http://localhost:8080/order/history/${this.user_id}/${order_id}`
      )
      .pipe(
        map((orders: any[]) => {
          return orders.map((order: any) => ({
            order_id: order.order_id,
            user_id: order.user_id,
            product_id: order.product_id,
            product_name: order.product_name,
            img_path: order.img_path,
            quantity: order.quantity,
            price: order.price,
          }));
        })
      );
  }
}
