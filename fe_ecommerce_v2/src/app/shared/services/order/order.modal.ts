export interface OrderHistory {
  order_id: number;
  order_date: string;
  total_amount: number;
  address: string;
  city: string;
  country: string;
  client_name: string;
  client_phone: string;
  listOrderDetail: OrderHistoryDetails[];
}

export interface OrderHistoryDetails {
  order_id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  img_path: string;
  quantity: number;
  price: number;
}
