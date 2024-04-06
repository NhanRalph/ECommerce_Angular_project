import { Injectable } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllProducts,
  getAllProductsSuccess,
  getProductByName,
  getProductByNameSuccess,
} from './product.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProducts),
      mergeMap(() => this.productService.getAllProducts()),
      map((products) => getAllProductsSuccess({ products })),
      catchError((error) => {
        console.error('Error fetching products', error);
        return of(getAllProductsSuccess({ products: [] }));
      })
    )
  );

  getProductByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductByName),
      mergeMap(({ productName }) =>
        this.productService.getProductByName(productName)
      ),
      map((products) => getProductByNameSuccess({ products })),
      catchError((error) => {
        console.error('Error fetching products', error);
        return of(getAllProductsSuccess({ products: [] }));
      })
    )
  );
}
