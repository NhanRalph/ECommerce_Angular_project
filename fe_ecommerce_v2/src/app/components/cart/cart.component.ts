import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart/cart.service';

import { Cart } from 'src/app/shared/services/cart/cart.model';
import { Subject, debounceTime } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  checkoutCart,
  getCart,
  getQuantityInCart,
} from 'src/app/shared/store/cartStore/cart.action';
import {
  selectCart,
  selectCartQuantity,
  selectCheckoutCart,
} from 'src/app/shared/store/cartStore/cart.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts!: Cart[];

  cartLength!: number;
  selectedCart: Cart[] = [];
  selectedCartLength: number = 0;
  totalPrice: number = 0;

  selectProducts: Cart[] = [];

  // Subject for debouncing updateQuantity method
  private updateQuantitySubject = new Subject<Cart>();

  constructor(
    private cartService: CartService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ngay mai them 1 ham de check quantity in cart > quantity of product
    this.getAllCart();

    // Subscribe to the updateQuantitySubject
    this.updateQuantitySubject
      .pipe(
        debounceTime(500) // Adjust debounce time as needed
      )
      .subscribe((cartItem) => {
        this.updateQuantity(cartItem);
      });

    this.fetchCartQuantity();
    this.store.pipe(select(selectCartQuantity)).subscribe((state) => {
      this.cartLength = state;
    });
  }

  fetchCartQuantity() {
    this.store.dispatch(getQuantityInCart());
  }

  getAllCart() {
    // this.store.dispatch(getCart());

    // this.store.pipe(select(selectCart)).subscribe((state) => {
    //   this.carts = state;
    //   this.calculateTotalPrice();
    //   this.fetchCartQuantity();
    // });

    this.cartService.getCart().subscribe((cart) => {
      this.carts = cart;
      this.calculateTotalPrice();
    });
  }

  delete(cart: Cart) {
    this.cartService
      .deleteCartItem(cart.cart_id, cart.product_id)
      .subscribe(() => {
        this.carts = this.carts.filter((c) => c.product_id !== cart.product_id);
        this.selectedCart = this.selectedCart.filter(
          (c) => c.product_id !== cart.product_id
        );

        this.selectedCartLength = this.selectedCart.length;
        this.calculateTotalPrice();
        this.fetchCartQuantity();
        if (this.carts.length === 0) {
          // Redirect to the homepage
          this.router.navigate(['/']);
        }
      });
  }

  decreaseQuantity(cartItem: Cart) {
    if (cartItem.quantity_in_cart > 1) {
      cartItem.quantity_in_cart--;
      this.calculateTotalPrice();
      this.updateQuantitySubject.next(cartItem);
    } else {
      let result = confirm(
        'If you delete this item, it will be removed from your cart. Do you want to proceed?'
      );
      if (result) {
        this.delete(cartItem);
      }
    }
  }

  increaseQuantity(cartItem: Cart) {
    if (cartItem.quantity_in_cart < cartItem.max_quantity) {
      cartItem.quantity_in_cart += 1;

      this.calculateTotalPrice();
      this.updateQuantitySubject.next(cartItem);
    } else {
      alert('You have reached the maximum quantity');
    }
  }

  updateQuantity(cartItem: Cart) {
    const cart = {
      cart_id: cartItem.cart_id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity_in_cart,
    };
    this.cartService
      .updataCartQuantity(cart.cart_id, cart.product_id, cart.quantity)
      .subscribe();
  }

  checkout() {
    this.store.dispatch(checkoutCart({ carts: this.selectedCart }));
  }

  calculateTotalPrice() {
    this.totalPrice = this.selectedCart.reduce(
      (total, cart) => total + cart.product_price * cart.quantity_in_cart,
      0
    );
  }

  onSelectionChange(event: any) {
    this.selectedCart = event;
    this.calculateTotalPrice();
    this.selectedCartLength = this.selectedCart.length;
  }
}
