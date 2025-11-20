export type Tasks = {
  id: string;
  name: string;
  description: string;
  priority: string;
  due_date: string;
  assigned_to: string;
  status: string;
  notes: string;
  category: string;
  duration: number;
  completed_date: string;
  color: string;
};

export type CountryOrder = {
  country: string;
  orders: number;
  revenue: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  product_name: string;
  order_date: string;
};

export type ChannelUser = {
  user_id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  country: string;
  postal_code: string;
  favorite_color: string;
};
