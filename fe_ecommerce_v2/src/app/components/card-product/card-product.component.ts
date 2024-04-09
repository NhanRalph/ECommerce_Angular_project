import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Product } from 'src/app/shared/services/product/product.model';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { getQuantityInCart } from 'src/app/shared/store/cartStore/cart.action';
import { getAllProducts } from 'src/app/shared/store/productStore/product.action';
import { selectProducts } from 'src/app/shared/store/productStore/product.selector';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  productsList: Product[] = [];
  categories: string[] = ['All'];
  isLoading: boolean = false;

  products$: Observable<Product[]> = new Observable<Product[]>();

  visible: boolean = false;
  selectedProduct: any; // Holds the selected product
  selectedQuantity: number = 1; // Holds the selected quantity
  maxQuantity: any; // Maximum quantity allowed for the selected product

  constructor(
    private store: Store,
    private category: CategoryService,
    private product: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();

    this.selectProduct();

    this.category.getCategory().subscribe(
      (categories: string[]) => {
        this.categories = ['All', ...categories]; // Update categories array
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchProducts() {
    this.isLoading = true; // Set isLoading to true before fetching products
    setTimeout(() => {
      this.store.dispatch(getAllProducts());
    }, 300);
  }

  selectProduct() {
    this.isLoading = true; // Set isLoading to true before fetching products
    this.store.pipe(select(selectProducts)).subscribe((products) => {
      this.productsList = products;
      this.isLoading = false; // Set isLoading to false once products are fetched
    });
  }

  getCategoryProduct(category: string) {
    this.isLoading = true; // Set isLoading to true before fetching category-specific products
    setTimeout(() => {
      if (category === 'All') {
        this.fetchProducts(); // Fetch all products
      } else {
        this.product.getCategoryProducts(category).subscribe((products) => {
          this.productsList = products;
          this.isLoading = false; // Set isLoading to false once products are fetched
        });
      }
    }, 300);
  }

  addToCart(selectedProduct: Product, selectedQuantity: number) {
    this.cart.addToCart(selectedProduct.id, selectedQuantity).subscribe(
      (response) => {
        this.store.dispatch(getQuantityInCart());
      },
      (error) => {
        alert('Số lượng trong kho không đủ!');
      }
    );
    this.hideDialog();
  }

  showDialog(product: Product) {
    this.selectedProduct = product;
    this.maxQuantity = product.quantity;
    this.visible = true;
  }
  hideDialog() {
    this.selectedQuantity = 1;
    this.visible = false;
  }
}
