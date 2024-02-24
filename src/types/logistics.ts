export type TruckDelivery = {
  shipment_id: string;
  truck_id: string;
  customer_id: string;
  customer_name: string;
  driver_name: string;
  origin_city: string;
  destination_city: string;
  shipment_date: string;
  delivery_time: number;
  shipment_weight: number;
  delivery_status: string;
  shipment_cost: number;
  favorite_color: string;
};

export type DeliveryAnalytics = {
  id: string;
  value: number;
  month: string;
  status: string;
};

export type Truck = {
  truck_id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  color: string;
  status: string;
  availability: boolean;
  origin: string;
  destination: string;
  progress: number;
};

export type DeliveryRequest = {
  id: string;
  name: string;
  pickup_location: string;
  delivery_location: string;
  delivery_date: string;
  delivery_time: number;
  truck_type: 'small' | 'medium' | 'large' | string;
  cargo_weight: number;
  delivery_status: 'pending' | 'in transit' | 'delivered' | string;
  driver_name: string;
  contact_number: string;
};
