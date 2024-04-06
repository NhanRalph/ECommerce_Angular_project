import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Product } from 'src/app/shared/services/product/product.model';
import { ProductService } from '../../shared/services/product/product.service';
import { getAllProducts } from 'src/app/shared/store/productStore/product.action';
import { selectProducts } from 'src/app/shared/store/productStore/product.selector';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  productsList: Product[] = [];
  constructor(private store: Store, private product: ProductService) {}

  ngOnInit(): void {
    this.product.getAllProducts().subscribe((products) => {
      this.productsList = products;
    });
  }
}
