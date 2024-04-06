import { createAction, props } from '@ngrx/store';
import { Product } from '../../services/product/product.model';

export const getAllProducts = createAction('[Product] Get All Products');
export const getAllProductsSuccess = createAction(
  '[Product] Get All Products Success',
  props<{ products: Product[] }>()
);

export const getProductByName = createAction(
  '[Product] Get Product By Name',
  props<{ productName: string }>()
);
export const getProductByNameSuccess = createAction(
  '[Product] Get Product By Name Success',
  props<{ products: Product[] }>()
);
