export type Bidding = {
  auction_id: string;
  nft_name: string;
  nft_image: string;
  seller_username: string;
  buyer_username: string;
  start_price: number;
  end_price: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'ending soon' | string;
  is_highest_bid_mine: boolean;
  winning_bid: number;
  time_left: string;
};

export type AuctionCreator = {
  creator_id: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  country: string;
  postal_code: string | null;
  favorite_color: string;
  sales_count: number;
  total_sales: string;
};

export type AuctionSales = {
  id: string;
  title: string;
  artist: string;
  volume: number;
  status: number;
  owners_count: number;
  description: string;
  image_url: string;
  creation_date: string;
  edition: number;
  price: number;
  owner: string;
  collection: string;
  verified: boolean;
};

export type AuctionTransactions = {
  id: string;
  image: string;
  product_id: string;
  transaction_date: string;
  seller: string;
  buyer: string;
  purchase_price: number;
  sale_price: number;
  profit: number;
  quantity: number;
  shipping_address: string;
  state: string | null;
  country: string;
  transaction_type: string;
};
