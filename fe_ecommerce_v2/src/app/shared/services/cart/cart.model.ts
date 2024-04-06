export interface Cart {
  product_id: number;
  cart_id: number;
  product_name: string;
  product_price: number;
  quantity_in_cart: number;
  max_quantity: number;
  total_price: number;
  product_image: string;
  checked: boolean;
}

export const initialCart: Cart = {
  product_id: 0,
  cart_id: 0,
  product_name: '',
  product_price: 0,
  quantity_in_cart: 0,
  max_quantity: 0,
  total_price: 0,
  product_image: '',
  checked: false,
};
