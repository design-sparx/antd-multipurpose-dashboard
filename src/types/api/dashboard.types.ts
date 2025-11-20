/**
 * Ant Design Dashboard API Types
 * Generated from Admin Hub API OpenAPI Specification
 */

// ==================== ENUMS ====================

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

export enum TaskCategory {
  Development = 'development',
  Design = 'design',
  Marketing = 'marketing',
  Sales = 'sales',
  Support = 'support',
  Other = 'other',
}

export enum TaskColor {
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

export interface ProductDto {
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

export interface ProductDto2 {
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

export interface ProductCreateResponse {
  success: boolean;
  message?: string;
  data?: ProductDto2;
}

export interface ProductUpdateResponse {
  success: boolean;
  message?: string;
  data?: ProductDto2;
}

export interface ProductDeleteResponse {
  success: boolean;
  message?: string;
}

export interface ProductListResponse {
  success: boolean;
  data?: ProductDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductResponse {
  success: boolean;
  data?: ProductDto2;
}

export interface CategoryDto {
  category_id?: string;
  category_name?: string;
  product_count: number;
  total_sales: number;
  icon?: string;
}

export interface CategoryListResponse {
  success: boolean;
  data?: CategoryDto[];
}

// ==================== ORDER TYPES ====================

export interface OrderDto {
  order_id?: string;
  product_name?: string;
  customer?: string;
  date?: string;
  amount: number;
  status?: string;
  payment_method?: string;
}

export interface OrderDto2 {
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

export interface OrderCreateResponse {
  success: boolean;
  message?: string;
  data?: OrderDto2;
}

export interface OrderUpdateResponse {
  success: boolean;
  message?: string;
  data?: OrderDto2;
}

export interface OrderDeleteResponse {
  success: boolean;
  message?: string;
}

export interface OrderListResponse {
  success: boolean;
  data?: OrderDto[];
  total: number;
}

export interface OrderResponse {
  success: boolean;
  data?: OrderDto2;
}

// ==================== SELLER TYPES ====================

export interface SellerDto {
  seller_id?: string;
  seller?: string;
  region?: string;
  total_sales: number;
  orders_count: number;
  rating: number;
  avatar_url?: string;
}

export interface SellerDto2 {
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

export interface SellerCreateResponse {
  success: boolean;
  message?: string;
  data?: SellerDto2;
}

export interface SellerUpdateResponse {
  success: boolean;
  message?: string;
  data?: SellerDto2;
}

export interface SellerDeleteResponse {
  success: boolean;
  message?: string;
}

export interface SellerListResponse {
  success: boolean;
  data?: SellerDto[];
}

export interface SellerResponse {
  success: boolean;
  data?: SellerDto2;
}

// ==================== PROJECT TYPES ====================

export interface ProjectDto {
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

export interface ProjectDto2 {
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

export interface ProjectCreateResponse {
  success: boolean;
  message?: string;
  data?: ProjectDto2;
}

export interface ProjectUpdateResponse {
  success: boolean;
  message?: string;
  data?: ProjectDto2;
}

export interface ProjectDeleteResponse {
  success: boolean;
  message?: string;
}

export interface ProjectListResponse {
  success: boolean;
  data?: ProjectDto[];
}

export interface ProjectResponse {
  success: boolean;
  data?: ProjectDto2;
}

// ==================== CLIENT TYPES ====================

export interface ClientDto {
  client_id?: string;
  client_name?: string;
  company?: string;
  email?: string;
  phone?: string;
  projects_count: number;
  total_value: number;
  status?: string;
}

export interface ClientDto2 {
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

export interface ClientCreateResponse {
  success: boolean;
  message?: string;
  data?: ClientDto2;
}

export interface ClientUpdateResponse {
  success: boolean;
  message?: string;
  data?: ClientDto2;
}

export interface ClientDeleteResponse {
  success: boolean;
  message?: string;
}

export interface ClientListResponse {
  success: boolean;
  data?: ClientDto[];
}

export interface ClientResponse {
  success: boolean;
  data?: ClientDto2;
}

// ==================== TASK TYPES ====================

export interface TaskDto {
  id?: string;
  title?: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignedTo?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==================== CAMPAIGN AD TYPES ====================

export interface CampaignAdDto {
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

export interface CampaignAdDto2 {
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

export interface CampaignAdCreateResponse {
  success: boolean;
  message?: string;
  data?: CampaignAdDto2;
}

export interface CampaignAdUpdateResponse {
  success: boolean;
  message?: string;
  data?: CampaignAdDto2;
}

export interface CampaignAdDeleteResponse {
  success: boolean;
  message?: string;
}

export interface CampaignAdListResponse {
  success: boolean;
  data?: CampaignAdDto[];
}

export interface CampaignAdResponse {
  success: boolean;
  data?: CampaignAdDto2;
}

// ==================== COURSE TYPES ====================

export interface CourseDto {
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

export interface RecommendedCourseDto {
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

export interface ExamDto {
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

export interface StudyStatisticDto {
  stat_id?: string;
  student_name?: string;
  courses_completed: number;
  hours_studied: number;
  average_score: number;
  current_streak: number;
  total_points: number;
}

// ==================== COMMUNITY GROUPS ====================

export interface CommunityGroupDto {
  group_id?: string;
  group_name?: string;
  category?: string;
  members_count: number;
  posts_count: number;
  created_date?: string;
  description?: string;
}

// ==================== SOCIAL MEDIA ====================

export interface SocialMediaActivityDto {
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

export interface SocialMediaStatsDto {
  stat_id?: string;
  platform?: string;
  followers: number;
  posts: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
}

export interface ScheduledPostDto {
  post_id?: string;
  platform?: string;
  content?: string;
  scheduled_time?: string;
  status?: string;
  media_urls?: string[];
  tags?: string[];
}

// ==================== BIDDING/AUCTION ====================

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

// ==================== LOGISTICS/DELIVERY ====================

export interface TruckCreateDto {
  licensePlate?: string;
  model?: string;
  capacity: number;
  status?: string;
}

export interface TruckUpdateDto {
  licensePlate?: string;
  model?: string;
  capacity: number;
  status?: string;
}

export interface TruckDeliveryCreateDto {
  truckId?: string;
  origin?: string;
  destination?: string;
  scheduledDate?: string;
  status?: string;
}

export interface TruckDeliveryUpdateDto {
  origin?: string;
  destination?: string;
  scheduledDate?: string;
  status?: string;
  actualDeliveryDate?: string;
}

export interface TruckDeliveryRequestCreateDto {
  customerId?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  requestedDate?: string;
  cargo?: string;
}

export interface TruckDeliveryRequestUpdateDto {
  pickupLocation?: string;
  deliveryLocation?: string;
  requestedDate?: string;
  cargo?: string;
  status?: string;
}

export interface DeliveryAnalyticCreateDto {
  date?: string;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  averageDeliveryTime: number;
}

export interface DeliveryAnalyticUpdateDto {
  date?: string;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  averageDeliveryTime: number;
}
