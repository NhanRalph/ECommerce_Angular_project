export interface Product {
  id: number;
  productName: string;
  price: number;
  category: string;
  quantity: number;
  imgPath: string;
}

export interface ProductsState {
  products: Product[];
}

export const initialState: ProductsState = {
  products: [],
};
