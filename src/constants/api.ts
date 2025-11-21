// API Configuration
// You can override the default API base URL by setting the VITE_API_BASE_URL environment variable

const DEFAULT_API_BASE_URL = 'http://localhost:5080';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

// API Endpoints for Ant Design Dashboard
export const API_ENDPOINTS = {
  // Corporate endpoints
  pricings: `${API_BASE_URL}/api/v1/antd/pricings`,
  faqs: `${API_BASE_URL}/api/v1/antd/faqs`,
  faqsFeatured: `${API_BASE_URL}/api/v1/antd/faqs/featured`,
  faqsStatistics: `${API_BASE_URL}/api/v1/antd/faqs/statistics`,
  licenses: `${API_BASE_URL}/api/v1/antd/licenses`,
  employees: `${API_BASE_URL}/api/v1/antd/employees`,
  employeesStatistics: `${API_BASE_URL}/api/v1/antd/employees/statistics`,

  // Dashboard endpoints
  products: `${API_BASE_URL}/api/v1/antd/products`,
  productsTop: `${API_BASE_URL}/api/v1/antd/products/top`,
  productsCategories: `${API_BASE_URL}/api/v1/antd/products/categories`,
  orders: `${API_BASE_URL}/api/v1/antd/orders`,
  ordersRecent: `${API_BASE_URL}/api/v1/antd/orders/recent`,
  sellers: `${API_BASE_URL}/api/v1/antd/sellers`,
  sellersTop: `${API_BASE_URL}/api/v1/antd/sellers/top`,
  projects: `${API_BASE_URL}/api/v1/antd/projects`,
  tasks: `${API_BASE_URL}/api/v1/antd/tasks`,
  campaignAds: `${API_BASE_URL}/api/v1/antd/campaign-ads`,
  socialMediaStats: `${API_BASE_URL}/api/v1/antd/social-media-stats`,
  socialMediaActivities: `${API_BASE_URL}/api/v1/antd/social-media-activities`,
  scheduledPosts: `${API_BASE_URL}/api/v1/antd/scheduled-posts`,
  liveAuctions: `${API_BASE_URL}/api/v1/antd/live-auctions`,
  auctionCreators: `${API_BASE_URL}/api/v1/antd/auction-creators`,
  biddingTopSellers: `${API_BASE_URL}/api/v1/antd/bidding-top-sellers`,
  biddingTransactions: `${API_BASE_URL}/api/v1/antd/bidding-transactions`,
  courses: `${API_BASE_URL}/api/v1/antd/courses`,
  recommendedCourses: `${API_BASE_URL}/api/v1/antd/recommended-courses`,
  exams: `${API_BASE_URL}/api/v1/antd/exams`,
  studyStatistics: `${API_BASE_URL}/api/v1/antd/study-statistics`,
  communityGroups: `${API_BASE_URL}/api/v1/antd/community-groups`,
  trucks: `${API_BASE_URL}/api/v1/antd/trucks`,
  truckDeliveries: `${API_BASE_URL}/api/v1/antd/truck-deliveries`,
  truckDeliveryRequests: `${API_BASE_URL}/api/v1/antd/truck-delivery-requests`,
  deliveryAnalytics: `${API_BASE_URL}/api/v1/antd/delivery-analytics`,
  clients: `${API_BASE_URL}/api/v1/antd/clients`,
};
