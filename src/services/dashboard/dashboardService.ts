/**
 * Dashboard Service
 * API calls for all dashboard endpoints
 */

import { apiRequest } from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  AuctionCreatorDto,
  BiddingTopSellerDto,
  BiddingTransactionDto,
  CampaignAdDto,
  CategoryListResponse,
  ClientDto,
  CommunityGroupDto,
  CourseDto,
  ExamDto,
  LiveAuctionDto,
  OrderDto,
  ProductDto,
  ProjectDto,
  RecommendedCourseDto,
  ScheduledPostDto,
  SellerDto,
  SocialMediaActivityDto,
  SocialMediaStatsDto,
  StudyStatisticDto,
  TaskDto,
} from '../../types/api/dashboard.types';

export const dashboardService = {
  // ==================== PRODUCTS ====================
  products: {
    /**
     * Get all products
     */
    getAll: () =>
      apiRequest.get<ProductDto[]>(API_ENDPOINTS.DASHBOARD.PRODUCTS.LIST),

    /**
     * Get top products
     */
    getTop: () =>
      apiRequest.get<ProductDto[]>(API_ENDPOINTS.DASHBOARD.PRODUCTS.TOP),

    /**
     * Get product categories
     */
    getCategories: () =>
      apiRequest.get<CategoryListResponse>(
        API_ENDPOINTS.DASHBOARD.PRODUCTS.CATEGORIES
      ),

    /**
     * Get single product by ID
     */
    getById: (id: string) =>
      apiRequest.get<ProductDto>(API_ENDPOINTS.DASHBOARD.PRODUCTS.GET(id)),

    /**
     * Create new product
     */
    create: (data: Partial<ProductDto>) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.PRODUCTS.CREATE, data),

    /**
     * Update product
     */
    update: (id: string, data: Partial<ProductDto>) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.PRODUCTS.UPDATE(id), data),

    /**
     * Delete product
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.PRODUCTS.DELETE(id)),
  },

  // ==================== ORDERS ====================
  orders: {
    /**
     * Get all orders
     */
    getAll: () =>
      apiRequest.get<OrderDto[]>(API_ENDPOINTS.DASHBOARD.ORDERS.LIST),

    /**
     * Get recent orders
     */
    getRecent: () =>
      apiRequest.get<OrderDto[]>(API_ENDPOINTS.DASHBOARD.ORDERS.RECENT),

    /**
     * Get single order by ID
     */
    getById: (id: string) =>
      apiRequest.get<OrderDto>(API_ENDPOINTS.DASHBOARD.ORDERS.GET(id)),

    /**
     * Create new order
     */
    create: (data: Partial<OrderDto>) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.ORDERS.CREATE, data),

    /**
     * Update order
     */
    update: (id: string, data: Partial<OrderDto>) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.ORDERS.UPDATE(id), data),

    /**
     * Delete order
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.ORDERS.DELETE(id)),
  },

  // ==================== SELLERS ====================
  sellers: {
    /**
     * Get all sellers
     */
    getAll: () =>
      apiRequest.get<SellerDto[]>(API_ENDPOINTS.DASHBOARD.SELLERS.LIST),

    /**
     * Get top sellers
     */
    getTop: () =>
      apiRequest.get<SellerDto[]>(API_ENDPOINTS.DASHBOARD.SELLERS.TOP),

    /**
     * Get single seller by ID
     */
    getById: (id: string) =>
      apiRequest.get<SellerDto>(API_ENDPOINTS.DASHBOARD.SELLERS.GET(id)),

    /**
     * Create new seller
     */
    create: (data: Partial<SellerDto>) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.SELLERS.CREATE, data),

    /**
     * Update seller
     */
    update: (id: string, data: Partial<SellerDto>) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.SELLERS.UPDATE(id), data),

    /**
     * Delete seller
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.SELLERS.DELETE(id)),
  },

  // ==================== PROJECTS ====================
  projects: {
    /**
     * Get all projects
     */
    getAll: () =>
      apiRequest.get<ProjectDto[]>(API_ENDPOINTS.DASHBOARD.PROJECTS.LIST),

    /**
     * Get a single project by ID
     */
    getById: (id: string) =>
      apiRequest.get<ProjectDto>(API_ENDPOINTS.DASHBOARD.PROJECTS.GET(id)),

    /**
     * Create new project
     */
    create: (data: Partial<ProjectDto>) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.PROJECTS.CREATE, data),

    /**
     * Update project
     */
    update: (id: string, data: Partial<ProjectDto>) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.PROJECTS.UPDATE(id), data),

    /**
     * Delete project
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.PROJECTS.DELETE(id)),
  },

  // ==================== CLIENTS ====================
  clients: {
    /**
     * Get all clients
     */
    getAll: () =>
      apiRequest.get<ClientDto[]>(API_ENDPOINTS.DASHBOARD.CLIENTS.LIST),

    /**
     * Get single client by ID
     */
    getById: (id: string) =>
      apiRequest.get<ClientDto>(API_ENDPOINTS.DASHBOARD.CLIENTS.GET(id)),

    /**
     * Create new client
     */
    create: (data: Partial<ClientDto>) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.CLIENTS.CREATE, data),

    /**
     * Update client
     */
    update: (id: string, data: Partial<ClientDto>) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.CLIENTS.UPDATE(id), data),

    /**
     * Delete client
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.CLIENTS.DELETE(id)),
  },

  // ==================== TASKS ====================
  tasks: {
    /**
     * Get all tasks
     */
    getAll: () => apiRequest.get<TaskDto[]>(API_ENDPOINTS.DASHBOARD.TASKS.LIST),

    /**
     * Get single task by ID
     */
    getById: (id: string) =>
      apiRequest.get<TaskDto>(API_ENDPOINTS.DASHBOARD.TASKS.GET(id)),

    /**
     * Create new task
     */
    create: (data: Partial<TaskDto>) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.TASKS.CREATE, data),

    /**
     * Update task
     */
    update: (id: string, data: Partial<TaskDto>) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.TASKS.UPDATE(id), data),

    /**
     * Delete task
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.TASKS.DELETE(id)),
  },

  // ==================== CAMPAIGN ADS ====================
  campaignAds: {
    /**
     * Get all campaign ads
     */
    getAll: () =>
      apiRequest.get<CampaignAdDto[]>(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.LIST),

    /**
     * Get single campaign ad by ID
     */
    getById: (id: string) =>
      apiRequest.get<CampaignAdDto>(
        API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.GET(id)
      ),

    /**
     * Create new campaign ad
     */
    create: (data: Partial<CampaignAdDto>) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.CREATE, data),

    /**
     * Update campaign ad
     */
    update: (id: string, data: Partial<CampaignAdDto>) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.UPDATE(id), data),

    /**
     * Delete campaign ad
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.DELETE(id)),
  },

  // ==================== LEARNING/EDUCATION ====================
  courses: {
    /**
     * Get all courses
     */
    getAll: () =>
      apiRequest.get<CourseDto[]>(API_ENDPOINTS.DASHBOARD.COURSES.LIST),

    /**
     * Get single course by ID
     */
    getById: (id: string) =>
      apiRequest.get<CourseDto>(API_ENDPOINTS.DASHBOARD.COURSES.GET(id)),
  },

  recommendedCourses: {
    /**
     * Get all recommended courses
     */
    getAll: () =>
      apiRequest.get<RecommendedCourseDto[]>(
        API_ENDPOINTS.DASHBOARD.RECOMMENDED_COURSES.LIST
      ),

    /**
     * Get single recommended course by ID
     */
    getById: (id: string) =>
      apiRequest.get<RecommendedCourseDto>(
        API_ENDPOINTS.DASHBOARD.RECOMMENDED_COURSES.GET(id)
      ),
  },

  exams: {
    /**
     * Get all exams
     */
    getAll: () => apiRequest.get<ExamDto[]>(API_ENDPOINTS.DASHBOARD.EXAMS.LIST),

    /**
     * Get single exam by ID
     */
    getById: (id: string) =>
      apiRequest.get<ExamDto>(API_ENDPOINTS.DASHBOARD.EXAMS.GET(id)),
  },

  studyStatistics: {
    /**
     * Get all study statistics
     */
    getAll: () =>
      apiRequest.get<StudyStatisticDto[]>(
        API_ENDPOINTS.DASHBOARD.STUDY_STATISTICS.LIST
      ),

    /**
     * Get single study statistic by ID
     */
    getById: (id: string) =>
      apiRequest.get<StudyStatisticDto>(
        API_ENDPOINTS.DASHBOARD.STUDY_STATISTICS.GET(id)
      ),
  },

  communityGroups: {
    /**
     * Get all community groups
     */
    getAll: () =>
      apiRequest.get<CommunityGroupDto[]>(
        API_ENDPOINTS.DASHBOARD.COMMUNITY_GROUPS.LIST
      ),

    /**
     * Get single community group by ID
     */
    getById: (id: string) =>
      apiRequest.get<CommunityGroupDto>(
        API_ENDPOINTS.DASHBOARD.COMMUNITY_GROUPS.GET(id)
      ),
  },

  // ==================== SOCIAL MEDIA ====================
  socialMediaActivities: {
    /**
     * Get all social media activities
     */
    getAll: () =>
      apiRequest.get<SocialMediaActivityDto[]>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_ACTIVITIES.LIST
      ),

    /**
     * Get single social media activity by ID
     */
    getById: (id: string) =>
      apiRequest.get<SocialMediaActivityDto>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_ACTIVITIES.GET(id)
      ),
  },

  socialMediaStats: {
    /**
     * Get all social media stats
     */
    getAll: () =>
      apiRequest.get<SocialMediaStatsDto[]>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_STATS.LIST
      ),

    /**
     * Get single social media stat by ID
     */
    getById: (id: string) =>
      apiRequest.get<SocialMediaStatsDto>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_STATS.GET(id)
      ),
  },

  scheduledPosts: {
    /**
     * Get all scheduled posts
     */
    getAll: () =>
      apiRequest.get<ScheduledPostDto[]>(
        API_ENDPOINTS.DASHBOARD.SCHEDULED_POSTS.LIST
      ),

    /**
     * Get single scheduled post by ID
     */
    getById: (id: string) =>
      apiRequest.get<ScheduledPostDto>(
        API_ENDPOINTS.DASHBOARD.SCHEDULED_POSTS.GET(id)
      ),
  },

  // ==================== BIDDING/AUCTION ====================
  liveAuctions: {
    /**
     * Get all live auctions
     */
    getAll: () =>
      apiRequest.get<LiveAuctionDto[]>(
        API_ENDPOINTS.DASHBOARD.LIVE_AUCTIONS.LIST
      ),

    /**
     * Get single live auction by ID
     */
    getById: (id: string) =>
      apiRequest.get<LiveAuctionDto>(
        API_ENDPOINTS.DASHBOARD.LIVE_AUCTIONS.GET(id)
      ),
  },

  auctionCreators: {
    /**
     * Get all auction creators
     */
    getAll: () =>
      apiRequest.get<AuctionCreatorDto[]>(
        API_ENDPOINTS.DASHBOARD.AUCTION_CREATORS.LIST
      ),

    /**
     * Get single auction creator by ID
     */
    getById: (id: string) =>
      apiRequest.get<AuctionCreatorDto>(
        API_ENDPOINTS.DASHBOARD.AUCTION_CREATORS.GET(id)
      ),
  },

  biddingTopSellers: {
    /**
     * Get all bidding top sellers
     */
    getAll: () =>
      apiRequest.get<BiddingTopSellerDto[]>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TOP_SELLERS.LIST
      ),

    /**
     * Get single bidding top seller by ID
     */
    getById: (id: string) =>
      apiRequest.get<BiddingTopSellerDto>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TOP_SELLERS.GET(id)
      ),
  },

  biddingTransactions: {
    /**
     * Get all bidding transactions
     */
    getAll: () =>
      apiRequest.get<BiddingTransactionDto[]>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TRANSACTIONS.LIST
      ),

    /**
     * Get single bidding transaction by ID
     */
    getById: (id: string) =>
      apiRequest.get<BiddingTransactionDto>(
        API_ENDPOINTS.DASHBOARD.BIDDING_TRANSACTIONS.GET(id)
      ),
  },

  // ==================== LOGISTICS/DELIVERY ====================
  trucks: {
    /**
     * Get all trucks
     */
    getAll: () => apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCKS.LIST),

    /**
     * Get single truck by ID
     */
    getById: (id: string) => apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCKS.GET(id)),

    /**
     * Create new truck
     */
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.TRUCKS.CREATE, data),

    /**
     * Update truck
     */
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.TRUCKS.UPDATE(id), data),

    /**
     * Delete truck
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.TRUCKS.DELETE(id)),
  },

  truckDeliveries: {
    /**
     * Get all truck deliveries
     */
    getAll: () => apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.LIST),

    /**
     * Get single truck delivery by ID
     */
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.GET(id)),

    /**
     * Create new truck delivery
     */
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.CREATE, data),

    /**
     * Update truck delivery
     */
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.UPDATE(id), data),

    /**
     * Delete truck delivery
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.DELETE(id)),
  },

  truckDeliveryRequests: {
    /**
     * Get all truck delivery requests
     */
    getAll: () =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.LIST),

    /**
     * Get single truck delivery request by ID
     */
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.GET(id)),

    /**
     * Create new truck delivery request
     */
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.CREATE, data),

    /**
     * Update truck delivery request
     */
    update: (id: string, data: any) =>
      apiRequest.put(
        API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.UPDATE(id),
        data
      ),

    /**
     * Delete truck delivery request
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.DELETE(id)),
  },

  deliveryAnalytics: {
    /**
     * Get all delivery analytics
     */
    getAll: () => apiRequest.get(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.LIST),

    /**
     * Get single delivery analytic by ID
     */
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.GET(id)),

    /**
     * Create new delivery analytic
     */
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.CREATE, data),

    /**
     * Update delivery analytic
     */
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.UPDATE(id), data),

    /**
     * Delete delivery analytic
     */
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.DELETE(id)),
  },
};
