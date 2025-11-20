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
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  country: string;
  postal_code: string;
  favorite_color: string;
  sales_volume: number;
  sales_region: string;
  total_sales: number;
  customer_satisfaction: number;
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
