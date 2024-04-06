import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/products').pipe(
      map((productsArray: any[]) => {
        return productsArray.map((product) => ({
          id: product.product_id, // Assuming product_id is returned by getAllProducts()
          productName: product.product_name,
          price: parseFloat(product.price), // Assuming price is a string, parsing it to a number
          category: product.category_id.toString(), // Assuming category_id is returned by getAllProducts()
          quantity: product.quantity,
          imgPath: product.img_path,
        }));
      })
    );

    // this.products$ = this.productService.getAllProducts()
  }
  getCategoryProducts(category: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`http://localhost:8080/products/${category}`)
      .pipe(
        map((productsArray: any[]) => {
          return productsArray.map((product) => ({
            id: product.product_id, // Assuming product_id is returned by getAllProducts()
            productName: product.product_name,
            price: parseFloat(product.price), // Assuming price is a string, parsing it to a number
            category: product.category_id.toString(), // Assuming category_id is returned by getAllProducts()
            quantity: product.quantity,
            imgPath: product.img_path,
          }));
        })
      );
  }
  getProductByName(productName: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`http://localhost:8080/products-name`, {
        params: { name: productName },
      })
      .pipe(
        map((productsArray: any[]) => {
          return productsArray.map((product) => ({
            id: product.product_id,
            productName: product.product_name,
            price: parseFloat(product.price),
            category: product.category_id.toString(),
            quantity: product.quantity,
            imgPath: product.img_path,
          }));
        })
      );
  }
}
