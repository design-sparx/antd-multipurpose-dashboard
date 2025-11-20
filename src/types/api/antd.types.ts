/**
 * Ant Design Dashboard API Types
 * Generated from Admin Hub API OpenAPI Specification
 */

// ==================== ENUMS ====================

export enum AntdTaskStatus {
  Todo = 'todo',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export enum AntdTaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

export enum AntdTaskCategory {
  Development = 'development',
  Design = 'design',
  Marketing = 'marketing',
  Sales = 'sales',
  Support = 'support',
  Other = 'other',
}

export enum AntdTaskColor {
  Blue = 'blue',
  Green = 'green',
  Red = 'red',
  Orange = 'orange',
  Purple = 'purple',
  Gray = 'gray',
}

export enum ProjectState {
  Planning = 'planning',
  Active = 'active',
  OnHold = 'on_hold',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

export enum InvoiceStatus {
  Draft = 'draft',
  Sent = 'sent',
  Paid = 'paid',
  Overdue = 'overdue',
  Cancelled = 'cancelled',
}

export enum PaymentMethod {
  CreditCard = 'credit_card',
  DebitCard = 'debit_card',
  PayPal = 'paypal',
  BankTransfer = 'bank_transfer',
  Cash = 'cash',
}

// ==================== PRODUCT TYPES ====================

export interface AntdProductDto {
  product_id?: string;
  product_name?: string;
  brand?: string;
  price: number;
  quantity_sold: number;
  category?: string;
  expiration_date?: string;
  customer_reviews: number;
  average_rating: number;
  is_featured: boolean;
  image_url?: string;
}

export interface AntdProductDto2 {
  id?: string;
  name?: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AntdProductCreateResponse {
  success: boolean;
  message?: string;
  data?: AntdProductDto2;
}

export interface AntdProductUpdateResponse {
  success: boolean;
  message?: string;
  data?: AntdProductDto2;
}

export interface AntdProductDeleteResponse {
  success: boolean;
  message?: string;
}

export interface AntdProductListResponse {
  success: boolean;
  data?: AntdProductDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AntdProductResponse {
  success: boolean;
  data?: AntdProductDto2;
}

export interface AntdCategoryDto {
  category_id?: string;
  category_name?: string;
  product_count: number;
  total_sales: number;
  icon?: string;
}

export interface AntdCategoryListResponse {
  success: boolean;
  data?: AntdCategoryDto[];
}

// ==================== ORDER TYPES ====================

export interface AntdOrderDto {
  order_id?: string;
  product_name?: string;
  customer?: string;
  date?: string;
  amount: number;
  status?: string;
  payment_method?: string;
}

export interface AntdOrderDto2 {
  id?: string;
  orderNumber?: string;
  customerId?: string;
  customerName?: string;
  items?: OrderItemDto[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItemDto {
  productId?: string;
  productName?: string;
  quantity: number;
  price: number;
}

export interface AntdOrderCreateResponse {
  success: boolean;
  message?: string;
  data?: AntdOrderDto2;
}

export interface AntdOrderUpdateResponse {
  success: boolean;
  message?: string;
  data?: AntdOrderDto2;
}

export interface AntdOrderDeleteResponse {
  success: boolean;
  message?: string;
}

export interface AntdOrderListResponse {
  success: boolean;
  data?: AntdOrderDto[];
  total: number;
}

export interface AntdOrderResponse {
  success: boolean;
  data?: AntdOrderDto2;
}

// ==================== SELLER TYPES ====================

export interface AntdSellerDto {
  seller_id?: string;
  seller?: string;
  region?: string;
  total_sales: number;
  orders_count: number;
  rating: number;
  avatar_url?: string;
}

export interface AntdSellerDto2 {
  id?: string;
  name?: string;
  email?: string;
  region?: string;
  totalSales: number;
  ordersCount: number;
  rating: number;
  avatarUrl?: string;
  createdAt?: string;
}

export interface AntdSellerCreateResponse {
  success: boolean;
  message?: string;
  data?: AntdSellerDto2;
}

export interface AntdSellerUpdateResponse {
  success: boolean;
  message?: string;
  data?: AntdSellerDto2;
}

export interface AntdSellerDeleteResponse {
  success: boolean;
  message?: string;
}

export interface AntdSellerListResponse {
  success: boolean;
  data?: AntdSellerDto[];
}

export interface AntdSellerResponse {
  success: boolean;
  data?: AntdSellerDto2;
}

// ==================== PROJECT TYPES ====================

export interface AntdProjectDto {
  project_id?: string;
  project_name?: string;
  client?: string;
  start_date?: string;
  end_date?: string;
  budget: number;
  status?: string;
  progress: number;
  team_size: number;
  priority?: string;
}

export interface AntdProjectDto2 {
  id?: string;
  name?: string;
  description?: string;
  clientId?: string;
  clientName?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
  status: ProjectState;
  progress: number;
  teamSize: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AntdProjectCreateResponse {
  success: boolean;
  message?: string;
  data?: AntdProjectDto2;
}

export interface AntdProjectUpdateResponse {
  success: boolean;
  message?: string;
  data?: AntdProjectDto2;
}

export interface AntdProjectDeleteResponse {
  success: boolean;
  message?: string;
}

export interface AntdProjectListResponse {
  success: boolean;
  data?: AntdProjectDto[];
}

export interface AntdProjectResponse {
  success: boolean;
  data?: AntdProjectDto2;
}

// ==================== CLIENT TYPES ====================

export interface AntdClientDto {
  client_id?: string;
  client_name?: string;
  company?: string;
  email?: string;
  phone?: string;
  projects_count: number;
  total_value: number;
  status?: string;
}

export interface AntdClientDto2 {
  id?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  projectsCount: number;
  totalValue: number;
  status?: string;
  createdAt?: string;
}

export interface AntdClientCreateResponse {
  success: boolean;
  message?: string;
  data?: AntdClientDto2;
}

export interface AntdClientUpdateResponse {
  success: boolean;
  message?: string;
  data?: AntdClientDto2;
}

export interface AntdClientDeleteResponse {
  success: boolean;
  message?: string;
}

export interface AntdClientListResponse {
  success: boolean;
  data?: AntdClientDto[];
}

export interface AntdClientResponse {
  success: boolean;
  data?: AntdClientDto2;
}

// ==================== TASK TYPES ====================

export interface TaskDto {
  id?: string;
  title?: string;
  description?: string;
  status: AntdTaskStatus;
  priority: AntdTaskPriority;
  category: AntdTaskCategory;
  assignedTo?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==================== CAMPAIGN AD TYPES ====================

export interface AntdCampaignAdDto {
  campaign_id?: string;
  campaign_name?: string;
  platform?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}

export interface AntdCampaignAdDto2 {
  id?: string;
  name?: string;
  platform?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface AntdCampaignAdCreateResponse {
  success: boolean;
  message?: string;
  data?: AntdCampaignAdDto2;
}

export interface AntdCampaignAdUpdateResponse {
  success: boolean;
  message?: string;
  data?: AntdCampaignAdDto2;
}

export interface AntdCampaignAdDeleteResponse {
  success: boolean;
  message?: string;
}

export interface AntdCampaignAdListResponse {
  success: boolean;
  data?: AntdCampaignAdDto[];
}

export interface AntdCampaignAdResponse {
  success: boolean;
  data?: AntdCampaignAdDto2;
}

// ==================== COURSE TYPES ====================

export interface AntdCourseDto {
  course_id?: string;
  course_name?: string;
  instructor?: string;
  duration?: string;
  enrolled_students: number;
  rating: number;
  category?: string;
  price: number;
  thumbnail_url?: string;
}

export interface AntdRecommendedCourseDto {
  course_id?: string;
  course_name?: string;
  instructor?: string;
  rating: number;
  students: number;
  price: number;
  category?: string;
  thumbnail_url?: string;
}

// ==================== EXAM TYPES ====================

export interface AntdExamDto {
  exam_id?: string;
  exam_name?: string;
  subject?: string;
  date?: string;
  duration?: string;
  total_questions: number;
  passing_score: number;
  status?: string;
}

// ==================== STUDY STATISTICS ====================

export interface AntdStudyStatisticDto {
  stat_id?: string;
  student_name?: string;
  courses_completed: number;
  hours_studied: number;
  average_score: number;
  current_streak: number;
  total_points: number;
}

// ==================== COMMUNITY GROUPS ====================

export interface AntdCommunityGroupDto {
  group_id?: string;
  group_name?: string;
  category?: string;
  members_count: number;
  posts_count: number;
  created_date?: string;
  description?: string;
}

// ==================== SOCIAL MEDIA ====================

export interface AntdSocialMediaActivityDto {
  activity_id?: string;
  platform?: string;
  post_type?: string;
  content?: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagement_rate: number;
  posted_date?: string;
}

export interface AntdSocialMediaStatsDto {
  stat_id?: string;
  platform?: string;
  followers: number;
  posts: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
}

export interface AntdScheduledPostDto {
  post_id?: string;
  platform?: string;
  content?: string;
  scheduled_time?: string;
  status?: string;
  media_urls?: string[];
  tags?: string[];
}

// ==================== BIDDING/AUCTION ====================

export interface AntdLiveAuctionDto {
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

export interface AntdAuctionCreatorDto {
  creator_id?: string;
  creator_name?: string;
  total_auctions: number;
  successful_sales: number;
  total_revenue: number;
  rating: number;
  avatar_url?: string;
}

export interface AntdBiddingTopSellerDto {
  seller_id?: string;
  seller_name?: string;
  total_sales: number;
  items_sold: number;
  average_price: number;
  rating: number;
  avatar_url?: string;
}

export interface AntdBiddingTransactionDto {
  transaction_id?: string;
  item_name?: string;
  buyer?: string;
  seller?: string;
  final_price: number;
  transaction_date?: string;
  status?: string;
}

// ==================== LOGISTICS/DELIVERY ====================

export interface AntdTruckCreateDto {
  licensePlate?: string;
  model?: string;
  capacity: number;
  status?: string;
}

export interface AntdTruckUpdateDto {
  licensePlate?: string;
  model?: string;
  capacity: number;
  status?: string;
}

export interface AntdTruckDeliveryCreateDto {
  truckId?: string;
  origin?: string;
  destination?: string;
  scheduledDate?: string;
  status?: string;
}

export interface AntdTruckDeliveryUpdateDto {
  origin?: string;
  destination?: string;
  scheduledDate?: string;
  status?: string;
  actualDeliveryDate?: string;
}

export interface AntdTruckDeliveryRequestCreateDto {
  customerId?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  requestedDate?: string;
  cargo?: string;
}

export interface AntdTruckDeliveryRequestUpdateDto {
  pickupLocation?: string;
  deliveryLocation?: string;
  requestedDate?: string;
  cargo?: string;
  status?: string;
}

export interface AntdDeliveryAnalyticCreateDto {
  date?: string;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  averageDeliveryTime: number;
}

export interface AntdDeliveryAnalyticUpdateDto {
  date?: string;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  averageDeliveryTime: number;
}
