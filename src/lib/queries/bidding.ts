/**
 * Bidding/Auction Query Module
 * Contains all bidding and auction-related types, API functions, and React Query hooks
 * Includes: live auctions, auction creators, bidding sellers, and transactions
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface LiveAuctionDto {
  auction_id?: string;
  item_name?: string;
  current_bid: number;
  minimum_bid: number;
  bidders_count: number;
  time_remaining?: string;
  image_url?: string;
  category?: string;
  seller?: string;
}

export interface AuctionCreatorDto {
  creator_id?: string;
  creator_name?: string;
  total_auctions: number;
  successful_sales: number;
  total_revenue: number;
  rating: number;
  avatar_url?: string;
}

export interface BiddingTopSellerDto {
  seller_id?: string;
  seller_name?: string;
  total_sales: number;
  items_sold: number;
  average_price: number;
  rating: number;
  avatar_url?: string;
}

export interface BiddingTransactionDto {
  transaction_id?: string;
  item_name?: string;
  buyer?: string;
  seller?: string;
  final_price: number;
  transaction_date?: string;
  status?: string;
}

// ==================== QUERY KEYS ====================

export const auctionKeys = {
  all: ['auctions'] as const,
  live: () => [...auctionKeys.all, 'live'] as const,
  creators: () => [...auctionKeys.all, 'creators'] as const,
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: (id: string) => [...auctionKeys.details(), id] as const,
};

export const biddingSellerKeys = {
  all: ['bidding-sellers'] as const,
  top: () => [...biddingSellerKeys.all, 'top'] as const,
  details: () => [...biddingSellerKeys.all, 'detail'] as const,
  detail: (id: string) => [...biddingSellerKeys.details(), id] as const,
};

export const biddingTransactionKeys = {
  all: ['bidding-transactions'] as const,
  lists: () => [...biddingTransactionKeys.all, 'list'] as const,
  details: () => [...biddingTransactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...biddingTransactionKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const biddingApi = {
  liveAuctions: {
    getAll: () =>
      apiRequest.get<LiveAuctionDto[]>(
        API_ENDPOINTS.DASHBOARD.LIVE_AUCTIONS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<LiveAuctionDto>(
        API_ENDPOINTS.DASHBOARD.LIVE_AUCTIONS.GET(id)
      ),
  },
  auctionCreators: {
    getAll: () =>
      apiRequest.get<AuctionCreatorDto[]>(
        API_ENDPOINTS.DASHBOARD.AUCTION_CREATORS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<AuctionCreatorDto>(
        API_ENDPOINTS.DASHBOARD.AUCTION_CREATORS.GET(id)
      ),
  },
  topSellers: {
    getAll: () =>
      apiRequest.get<BiddingTopSellerDto[]>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TOP_SELLERS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<BiddingTopSellerDto>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TOP_SELLERS.GET(id)
      ),
  },
  transactions: {
    getAll: () =>
      apiRequest.get<BiddingTransactionDto[]>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TRANSACTIONS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<BiddingTransactionDto>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TRANSACTIONS.GET(id)
      ),
  },
};

// ==================== LIVE AUCTIONS QUERY HOOKS ====================

export const useLiveAuctions = (
  options?: UseQueryOptions<LiveAuctionDto[]>
) => {
  return useQuery({
    queryKey: auctionKeys.live(),
    queryFn: biddingApi.liveAuctions.getAll,
    ...options,
  });
};

export const useLiveAuction = (id: string) => {
  return useQuery({
    queryKey: auctionKeys.detail(id),
    queryFn: () => biddingApi.liveAuctions.getById(id),
    enabled: !!id,
  });
};

// ==================== AUCTION CREATORS QUERY HOOKS ====================

export const useAuctionCreators = (
  options?: UseQueryOptions<AuctionCreatorDto[]>
) => {
  return useQuery({
    queryKey: auctionKeys.creators(),
    queryFn: biddingApi.auctionCreators.getAll,
    ...options,
  });
};

export const useAuctionCreator = (id: string) => {
  return useQuery({
    queryKey: auctionKeys.detail(id),
    queryFn: () => biddingApi.auctionCreators.getById(id),
    enabled: !!id,
  });
};

// ==================== BIDDING TOP SELLERS QUERY HOOKS ====================

export const useBiddingTopSellers = (
  options?: UseQueryOptions<BiddingTopSellerDto[]>
) => {
  return useQuery({
    queryKey: biddingSellerKeys.top(),
    queryFn: biddingApi.topSellers.getAll,
    ...options,
  });
};

export const useBiddingTopSeller = (id: string) => {
  return useQuery({
    queryKey: biddingSellerKeys.detail(id),
    queryFn: () => biddingApi.topSellers.getById(id),
    enabled: !!id,
  });
};

// ==================== BIDDING TRANSACTIONS QUERY HOOKS ====================

export const useBiddingTransactions = (
  options?: UseQueryOptions<BiddingTransactionDto[]>
) => {
  return useQuery({
    queryKey: biddingTransactionKeys.all,
    queryFn: biddingApi.transactions.getAll,
    ...options,
  });
};

export const useBiddingTransaction = (id: string) => {
  return useQuery({
    queryKey: biddingTransactionKeys.detail(id),
    queryFn: () => biddingApi.transactions.getById(id),
    enabled: !!id,
  });
};
