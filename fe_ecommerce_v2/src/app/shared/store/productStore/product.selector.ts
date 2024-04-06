import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../../services/product/product.model';

export const selectProductState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductsState) => state.products
);
