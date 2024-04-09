import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import {
  OrderHistory,
  OrderHistoryDetails,
} from 'src/app/shared/services/order/order.modal';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { getQuantityInCart } from 'src/app/shared/store/cartStore/cart.action';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss'],
})
export class HistoryOrderComponent implements OnInit {
  // export interface OrderHistory {
  //   order_id: number;
  //   order_date: string;
  //   total_amount: number;
  //   address: string;
  //   city: string;
  //   country: string;
  //   client_name: string;
  //   client_phone: string;
  //   listOrderDetail: OrderHistoryDetails[];
  // }

  historyOrders: OrderHistory[] = [];

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.fetchHistoryOrders();
  }

  fetchHistoryOrders(): void {
    this.orderService.getHistoryOrders().subscribe((orders) => {
      // Fetch order details for each order
      orders.forEach((order) => {
        this.orderService
          .getHistoryOrderDetails(order.order_id)
          .subscribe((orderDetails) => {
            order.listOrderDetail = orderDetails;
          });
      });
      // Assign orders to historyOrders after fetching details
      this.historyOrders = orders;
      console.log(this.historyOrders);
    });
  }

  toggleOrder(order: OrderHistory) {}

  rebuy(order: OrderHistoryDetails) {
    this.cartService.addToCart(order.product_id, order.quantity).subscribe(
      (response) => {
        this.store.dispatch(getQuantityInCart());
      },
      (error) => {
        alert('Số lượng trong kho không đủ!');
      }
    );
    console.table(order);
  }
}
