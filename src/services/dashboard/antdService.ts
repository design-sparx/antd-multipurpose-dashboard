/**
 * Ant Design Dashboard Service
 * API calls for all Antd dashboard endpoints
 */

import { apiRequest } from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  AntdProductDto,
  AntdProductListResponse,
  AntdCategoryListResponse,
  AntdOrderDto,
  AntdOrderListResponse,
  AntdSellerDto,
  AntdSellerListResponse,
  AntdProjectDto,
  AntdProjectListResponse,
  AntdClientDto,
  AntdClientListResponse,
  TaskDto,
  AntdCampaignAdDto,
  AntdCampaignAdListResponse,
  AntdCourseDto,
  AntdRecommendedCourseDto,
  AntdExamDto,
  AntdStudyStatisticDto,
  AntdCommunityGroupDto,
  AntdSocialMediaActivityDto,
  AntdSocialMediaStatsDto,
  AntdScheduledPostDto,
  AntdLiveAuctionDto,
  AntdAuctionCreatorDto,
  AntdBiddingTopSellerDto,
  AntdBiddingTransactionDto,
} from '../../types/api';

export const antdService = {
  // ==================== PRODUCTS ====================
  products: {
    /**
     * Get all products
     */
    getAll: () => apiRequest.get<AntdProductDto[]>(API_ENDPOINTS.ANTD.PRODUCTS.LIST),

    /**
     * Get top products
     */
    getTop: () => apiRequest.get<AntdProductDto[]>(API_ENDPOINTS.ANTD.PRODUCTS.TOP),

    /**
     * Get product categories
     */
    getCategories: () => apiRequest.get<AntdCategoryListResponse>(API_ENDPOINTS.ANTD.PRODUCTS.CATEGORIES),

    /**
     * Get single product by ID
     */
    getById: (id: string) => apiRequest.get<AntdProductDto>(API_ENDPOINTS.ANTD.PRODUCTS.GET(id)),

    /**
     * Create new product
     */
    create: (data: Partial<AntdProductDto>) =>
      apiRequest.post(API_ENDPOINTS.ANTD.PRODUCTS.CREATE, data),

    /**
     * Update product
     */
    update: (id: string, data: Partial<AntdProductDto>) =>
      apiRequest.put(API_ENDPOINTS.ANTD.PRODUCTS.UPDATE(id), data),

    /**
     * Delete product
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.PRODUCTS.DELETE(id)),
  },

  // ==================== ORDERS ====================
  orders: {
    /**
     * Get all orders
     */
    getAll: () => apiRequest.get<AntdOrderDto[]>(API_ENDPOINTS.ANTD.ORDERS.LIST),

    /**
     * Get recent orders
     */
    getRecent: () => apiRequest.get<AntdOrderDto[]>(API_ENDPOINTS.ANTD.ORDERS.RECENT),

    /**
     * Get single order by ID
     */
    getById: (id: string) => apiRequest.get<AntdOrderDto>(API_ENDPOINTS.ANTD.ORDERS.GET(id)),

    /**
     * Create new order
     */
    create: (data: Partial<AntdOrderDto>) =>
      apiRequest.post(API_ENDPOINTS.ANTD.ORDERS.CREATE, data),

    /**
     * Update order
     */
    update: (id: string, data: Partial<AntdOrderDto>) =>
      apiRequest.put(API_ENDPOINTS.ANTD.ORDERS.UPDATE(id), data),

    /**
     * Delete order
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.ORDERS.DELETE(id)),
  },

  // ==================== SELLERS ====================
  sellers: {
    /**
     * Get all sellers
     */
    getAll: () => apiRequest.get<AntdSellerDto[]>(API_ENDPOINTS.ANTD.SELLERS.LIST),

    /**
     * Get top sellers
     */
    getTop: () => apiRequest.get<AntdSellerDto[]>(API_ENDPOINTS.ANTD.SELLERS.TOP),

    /**
     * Get single seller by ID
     */
    getById: (id: string) => apiRequest.get<AntdSellerDto>(API_ENDPOINTS.ANTD.SELLERS.GET(id)),

    /**
     * Create new seller
     */
    create: (data: Partial<AntdSellerDto>) =>
      apiRequest.post(API_ENDPOINTS.ANTD.SELLERS.CREATE, data),

    /**
     * Update seller
     */
    update: (id: string, data: Partial<AntdSellerDto>) =>
      apiRequest.put(API_ENDPOINTS.ANTD.SELLERS.UPDATE(id), data),

    /**
     * Delete seller
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.SELLERS.DELETE(id)),
  },

  // ==================== PROJECTS ====================
  projects: {
    /**
     * Get all projects
     */
    getAll: () => apiRequest.get<AntdProjectDto[]>(API_ENDPOINTS.ANTD.PROJECTS.LIST),

    /**
     * Get single project by ID
     */
    getById: (id: string) => apiRequest.get<AntdProjectDto>(API_ENDPOINTS.ANTD.PROJECTS.GET(id)),

    /**
     * Create new project
     */
    create: (data: Partial<AntdProjectDto>) =>
      apiRequest.post(API_ENDPOINTS.ANTD.PROJECTS.CREATE, data),

    /**
     * Update project
     */
    update: (id: string, data: Partial<AntdProjectDto>) =>
      apiRequest.put(API_ENDPOINTS.ANTD.PROJECTS.UPDATE(id), data),

    /**
     * Delete project
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.PROJECTS.DELETE(id)),
  },

  // ==================== CLIENTS ====================
  clients: {
    /**
     * Get all clients
     */
    getAll: () => apiRequest.get<AntdClientDto[]>(API_ENDPOINTS.ANTD.CLIENTS.LIST),

    /**
     * Get single client by ID
     */
    getById: (id: string) => apiRequest.get<AntdClientDto>(API_ENDPOINTS.ANTD.CLIENTS.GET(id)),

    /**
     * Create new client
     */
    create: (data: Partial<AntdClientDto>) =>
      apiRequest.post(API_ENDPOINTS.ANTD.CLIENTS.CREATE, data),

    /**
     * Update client
     */
    update: (id: string, data: Partial<AntdClientDto>) =>
      apiRequest.put(API_ENDPOINTS.ANTD.CLIENTS.UPDATE(id), data),

    /**
     * Delete client
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.CLIENTS.DELETE(id)),
  },

  // ==================== TASKS ====================
  tasks: {
    /**
     * Get all tasks
     */
    getAll: () => apiRequest.get<TaskDto[]>(API_ENDPOINTS.ANTD.TASKS.LIST),

    /**
     * Get single task by ID
     */
    getById: (id: string) => apiRequest.get<TaskDto>(API_ENDPOINTS.ANTD.TASKS.GET(id)),

    /**
     * Create new task
     */
    create: (data: Partial<TaskDto>) => apiRequest.post(API_ENDPOINTS.ANTD.TASKS.CREATE, data),

    /**
     * Update task
     */
    update: (id: string, data: Partial<TaskDto>) =>
      apiRequest.put(API_ENDPOINTS.ANTD.TASKS.UPDATE(id), data),

    /**
     * Delete task
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.TASKS.DELETE(id)),
  },

  // ==================== CAMPAIGN ADS ====================
  campaignAds: {
    /**
     * Get all campaign ads
     */
    getAll: () => apiRequest.get<AntdCampaignAdDto[]>(API_ENDPOINTS.ANTD.CAMPAIGN_ADS.LIST),

    /**
     * Get single campaign ad by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdCampaignAdDto>(API_ENDPOINTS.ANTD.CAMPAIGN_ADS.GET(id)),

    /**
     * Create new campaign ad
     */
    create: (data: Partial<AntdCampaignAdDto>) =>
      apiRequest.post(API_ENDPOINTS.ANTD.CAMPAIGN_ADS.CREATE, data),

    /**
     * Update campaign ad
     */
    update: (id: string, data: Partial<AntdCampaignAdDto>) =>
      apiRequest.put(API_ENDPOINTS.ANTD.CAMPAIGN_ADS.UPDATE(id), data),

    /**
     * Delete campaign ad
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.CAMPAIGN_ADS.DELETE(id)),
  },

  // ==================== LEARNING/EDUCATION ====================
  courses: {
    /**
     * Get all courses
     */
    getAll: () => apiRequest.get<AntdCourseDto[]>(API_ENDPOINTS.ANTD.COURSES.LIST),

    /**
     * Get single course by ID
     */
    getById: (id: string) => apiRequest.get<AntdCourseDto>(API_ENDPOINTS.ANTD.COURSES.GET(id)),
  },

  recommendedCourses: {
    /**
     * Get all recommended courses
     */
    getAll: () =>
      apiRequest.get<AntdRecommendedCourseDto[]>(API_ENDPOINTS.ANTD.RECOMMENDED_COURSES.LIST),

    /**
     * Get single recommended course by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdRecommendedCourseDto>(API_ENDPOINTS.ANTD.RECOMMENDED_COURSES.GET(id)),
  },

  exams: {
    /**
     * Get all exams
     */
    getAll: () => apiRequest.get<AntdExamDto[]>(API_ENDPOINTS.ANTD.EXAMS.LIST),

    /**
     * Get single exam by ID
     */
    getById: (id: string) => apiRequest.get<AntdExamDto>(API_ENDPOINTS.ANTD.EXAMS.GET(id)),
  },

  studyStatistics: {
    /**
     * Get all study statistics
     */
    getAll: () =>
      apiRequest.get<AntdStudyStatisticDto[]>(API_ENDPOINTS.ANTD.STUDY_STATISTICS.LIST),

    /**
     * Get single study statistic by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdStudyStatisticDto>(API_ENDPOINTS.ANTD.STUDY_STATISTICS.GET(id)),
  },

  communityGroups: {
    /**
     * Get all community groups
     */
    getAll: () =>
      apiRequest.get<AntdCommunityGroupDto[]>(API_ENDPOINTS.ANTD.COMMUNITY_GROUPS.LIST),

    /**
     * Get single community group by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdCommunityGroupDto>(API_ENDPOINTS.ANTD.COMMUNITY_GROUPS.GET(id)),
  },

  // ==================== SOCIAL MEDIA ====================
  socialMediaActivities: {
    /**
     * Get all social media activities
     */
    getAll: () =>
      apiRequest.get<AntdSocialMediaActivityDto[]>(
        API_ENDPOINTS.ANTD.SOCIAL_MEDIA_ACTIVITIES.LIST
      ),

    /**
     * Get single social media activity by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdSocialMediaActivityDto>(
        API_ENDPOINTS.ANTD.SOCIAL_MEDIA_ACTIVITIES.GET(id)
      ),
  },

  socialMediaStats: {
    /**
     * Get all social media stats
     */
    getAll: () =>
      apiRequest.get<AntdSocialMediaStatsDto[]>(API_ENDPOINTS.ANTD.SOCIAL_MEDIA_STATS.LIST),

    /**
     * Get single social media stat by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdSocialMediaStatsDto>(API_ENDPOINTS.ANTD.SOCIAL_MEDIA_STATS.GET(id)),
  },

  scheduledPosts: {
    /**
     * Get all scheduled posts
     */
    getAll: () =>
      apiRequest.get<AntdScheduledPostDto[]>(API_ENDPOINTS.ANTD.SCHEDULED_POSTS.LIST),

    /**
     * Get single scheduled post by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdScheduledPostDto>(API_ENDPOINTS.ANTD.SCHEDULED_POSTS.GET(id)),
  },

  // ==================== BIDDING/AUCTION ====================
  liveAuctions: {
    /**
     * Get all live auctions
     */
    getAll: () => apiRequest.get<AntdLiveAuctionDto[]>(API_ENDPOINTS.ANTD.LIVE_AUCTIONS.LIST),

    /**
     * Get single live auction by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdLiveAuctionDto>(API_ENDPOINTS.ANTD.LIVE_AUCTIONS.GET(id)),
  },

  auctionCreators: {
    /**
     * Get all auction creators
     */
    getAll: () =>
      apiRequest.get<AntdAuctionCreatorDto[]>(API_ENDPOINTS.ANTD.AUCTION_CREATORS.LIST),

    /**
     * Get single auction creator by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdAuctionCreatorDto>(API_ENDPOINTS.ANTD.AUCTION_CREATORS.GET(id)),
  },

  biddingTopSellers: {
    /**
     * Get all bidding top sellers
     */
    getAll: () =>
      apiRequest.get<AntdBiddingTopSellerDto[]>(API_ENDPOINTS.ANTD.BIDDING_TOP_SELLERS.LIST),

    /**
     * Get single bidding top seller by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdBiddingTopSellerDto>(API_ENDPOINTS.ANTD.BIDDING_TOP_SELLERS.GET(id)),
  },

  biddingTransactions: {
    /**
     * Get all bidding transactions
     */
    getAll: () =>
      apiRequest.get<AntdBiddingTransactionDto[]>(
        API_ENDPOINTS.ANTD.BIDDING_TRANSACTIONS.LIST
      ),

    /**
     * Get single bidding transaction by ID
     */
    getById: (id: string) =>
      apiRequest.get<AntdBiddingTransactionDto>(
        API_ENDPOINTS.ANTD.BIDDING_TRANSACTIONS.GET(id)
      ),
  },

  // ==================== LOGISTICS/DELIVERY ====================
  trucks: {
    /**
     * Get all trucks
     */
    getAll: () => apiRequest.get(API_ENDPOINTS.ANTD.TRUCKS.LIST),

    /**
     * Get single truck by ID
     */
    getById: (id: string) => apiRequest.get(API_ENDPOINTS.ANTD.TRUCKS.GET(id)),

    /**
     * Create new truck
     */
    create: (data: any) => apiRequest.post(API_ENDPOINTS.ANTD.TRUCKS.CREATE, data),

    /**
     * Update truck
     */
    update: (id: string, data: any) => apiRequest.put(API_ENDPOINTS.ANTD.TRUCKS.UPDATE(id), data),

    /**
     * Delete truck
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.TRUCKS.DELETE(id)),
  },

  truckDeliveries: {
    /**
     * Get all truck deliveries
     */
    getAll: () => apiRequest.get(API_ENDPOINTS.ANTD.TRUCK_DELIVERIES.LIST),

    /**
     * Get single truck delivery by ID
     */
    getById: (id: string) => apiRequest.get(API_ENDPOINTS.ANTD.TRUCK_DELIVERIES.GET(id)),

    /**
     * Create new truck delivery
     */
    create: (data: any) => apiRequest.post(API_ENDPOINTS.ANTD.TRUCK_DELIVERIES.CREATE, data),

    /**
     * Update truck delivery
     */
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.ANTD.TRUCK_DELIVERIES.UPDATE(id), data),

    /**
     * Delete truck delivery
     */
    delete: (id: string) => apiRequest.delete(API_ENDPOINTS.ANTD.TRUCK_DELIVERIES.DELETE(id)),
  },

  truckDeliveryRequests: {
    /**
     * Get all truck delivery requests
     */
    getAll: () => apiRequest.get(API_ENDPOINTS.ANTD.TRUCK_DELIVERY_REQUESTS.LIST),

    /**
     * Get single truck delivery request by ID
     */
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.ANTD.TRUCK_DELIVERY_REQUESTS.GET(id)),

    /**
     * Create new truck delivery request
     */
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.ANTD.TRUCK_DELIVERY_REQUESTS.CREATE, data),

    /**
     * Update truck delivery request
     */
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.ANTD.TRUCK_DELIVERY_REQUESTS.UPDATE(id), data),

    /**
     * Delete truck delivery request
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.ANTD.TRUCK_DELIVERY_REQUESTS.DELETE(id)),
  },

  deliveryAnalytics: {
    /**
     * Get all delivery analytics
     */
    getAll: () => apiRequest.get(API_ENDPOINTS.ANTD.DELIVERY_ANALYTICS.LIST),

    /**
     * Get single delivery analytic by ID
     */
    getById: (id: string) => apiRequest.get(API_ENDPOINTS.ANTD.DELIVERY_ANALYTICS.GET(id)),

    /**
     * Create new delivery analytic
     */
    create: (data: any) => apiRequest.post(API_ENDPOINTS.ANTD.DELIVERY_ANALYTICS.CREATE, data),

    /**
     * Update delivery analytic
     */
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.ANTD.DELIVERY_ANALYTICS.UPDATE(id), data),

    /**
     * Delete delivery analytic
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.ANTD.DELIVERY_ANALYTICS.DELETE(id)),
  },
};
