import { createReducer, on } from '@ngrx/store';
import {
  getAllProducts,
  getAllProductsSuccess,
  getProductByName,
  getProductByNameSuccess,
} from './product.action';
import { Product, initialState } from '../../services/product/product.model';

export const productReducer = createReducer(
  initialState,
  on(getAllProducts, (state) => state),
  on(getAllProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(getProductByName, (state) => state),
  on(getProductByNameSuccess, (state, { products }) => ({
    ...state,
    products,
  }))
);
