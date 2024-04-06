import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Address } from 'src/app/shared/services/address/address.model';
import { Cart } from 'src/app/shared/services/cart/cart.model';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { getQuantityInCart } from 'src/app/shared/store/cartStore/cart.action';
import { selectCheckoutCart } from 'src/app/shared/store/cartStore/cart.selector';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss'],
})
export class CheckoutListComponent implements OnInit {
  @Input() address!: Address; // Receive address from parent component

  carts: Cart[] = [];
  cartLength: number = 0;
  totalPrice: number = 0;

  constructor(
    private store: Store,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCart();
  }

  getAllCart() {
    this.store.pipe(select(selectCheckoutCart)).subscribe((state) => {
      this.carts = state;
      this.calculateTotalPrice();
      this.cartLength = this.carts.length;
    });
  }

  checkout() {
    // First, delete products from the cart
    this.carts.forEach((cart) => {
      this.orderService
        .deleteProductFromCart(this.address.user_id, cart.product_id)
        .subscribe(
          (response) => {
            // Product deleted successfully
            console.log('Product deleted successfully:', response);
          },
          (error) => {
            // Handle error deleting product
            console.error('Error deleting product:', error);
          }
        );
    });

    // Then, update product quantities
    this.carts.forEach((cart) => {
      this.orderService
        .updateProductQuantity(cart.product_id, cart.quantity_in_cart)
        .subscribe(
          (response) => {
            // Product quantity updated successfully
            console.log('Product quantity updated successfully:', response);
          },
          (error) => {
            // Handle error updating product quantity
            alert('Error updating product quantity:');
          }
        );
    });

    // Finally, proceed to place the order
    this.orderService.checkout(this.address, this.carts).subscribe(
      (response) => {
        // Handle success response
        console.log('Order placed successfully:', response);
        this.store.dispatch(getQuantityInCart());
        this.router.navigate(['/cart']);
      },
      (error) => {
        // Handle error response
        console.error('Error placing order:', error);
      }
    );
  }

  calculateTotalPrice() {
    this.totalPrice = this.carts.reduce(
      (total, cart) => total + cart.product_price * cart.quantity_in_cart,
      0
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.carts && this.carts.length > 0) {
      // Customize message if needed
      $event.returnValue = true;
    }
  }
}
