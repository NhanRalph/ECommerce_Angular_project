import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Store, select } from '@ngrx/store';
import { getQuantityInCart } from '../../store/cartStore/cart.action';
import { selectCartQuantity } from '../../store/cartStore/cart.selector';
import { ProductService } from '../../services/product/product.service';
import {
  getAllProducts,
  getProductByName,
} from '../../store/productStore/product.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  value = '';

  quantity: number = 2;

  constructor(
    private store: Store,
    private cart: CartService,
    private product: ProductService
  ) {
    // this.cart.getQuantityInCart().subscribe((quantity) => {
    //   this.quantity = quantity.quantity;
    // });
    this.fetchCartQuantity();
    this.store.pipe(select(selectCartQuantity)).subscribe((state) => {
      this.quantity = state;
    });
  }

  ngOnInit(): void {}

  fetchCartQuantity() {
    this.store.dispatch(getQuantityInCart());
  }

  getProduct() {
    if (this.value.trim()) {
      this.store.dispatch(getProductByName({ productName: this.value }));
    }

    if (this.value.trim() === '') {
      this.store.dispatch(getAllProducts());
    }
  }
}
