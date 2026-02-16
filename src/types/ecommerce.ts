export type TopProduct = {
  product_name: string;
  brand: string;
  price: number;
  quantity_sold: number;
  category: string;
  expiration_date: string;
  customer_reviews: number;
  average_rating: number;
  is_featured: boolean;
  image_url: string;
  product_id: string;
};

export type TopCategory = {
  product_name: string;
  category: string;
  brand: string;
  price: number;
  discount_percentage: number;
  rating: number;
  availability: boolean;
  description: string;
};

export type TopSeller = {
  id: string;
  seller_name: string;
  store_name: string;
  avatar: string;
  sales_volume: number;
  total_sales: number;
  orders_completed: number;
  rating: number;
  customer_satisfaction: number;
  sales_region: string;
  join_date: string;
};

export type RecentOrder = {
  order_id: string;
  customer_id: string;
  customer_name: string;
  product_id: string;
  quantity: number;
  price: number;
  order_date: string;
  shipping_address: string;
  city: string;
  country: string;
  tracking_number: string;
  status: 'shipped' | 'processing' | 'delivered' | 'cancelled';
};
