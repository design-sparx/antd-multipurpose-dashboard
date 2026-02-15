/**
 * Mock Endpoint Mapper
 * Maps production API endpoints to mock JSON files
 */

/**
 * Endpoint to Mock File Mapping
 * Maps API endpoint patterns to their corresponding mock JSON files
 */
const ENDPOINT_MOCK_MAP: Record<string, string> = {
  // Products
  '/antd/products/top': '/mocks/TopProducts.json',
  '/antd/products/categories': '/mocks/TopCategories.json',
  '/antd/products': '/mocks/TopProducts.json', // Use TopProducts as fallback

  // Orders
  '/antd/orders/recent': '/mocks/RecentOrders.json',
  '/antd/orders': '/mocks/RecentOrders.json', // Use RecentOrders as fallback

  // Sellers
  '/antd/sellers/top': '/mocks/TopSeller.json',
  '/antd/sellers': '/mocks/TopSeller.json', // Use TopSeller as fallback

  // Projects
  '/antd/projects': '/mocks/Projects.json',

  // Clients
  '/antd/clients': '/mocks/Clients.json',

  // Tasks
  '/antd/tasks': '/mocks/TasksList.json',

  // Campaign Ads
  '/antd/campaign-ads': '/mocks/CampaignAds.json',

  // Courses
  '/antd/courses': '/mocks/Courses.json',
  '/antd/recommended-courses': '/mocks/RecommendedCourses.json',

  // Exams
  '/antd/exams': '/mocks/Exams.json',

  // Study Statistics
  '/antd/study-statistics': '/mocks/StudyStatistics.json',

  // Community Groups
  '/antd/community-groups': '/mocks/CommunityGroups.json',

  // Social Media
  '/antd/social-media-activities': '/mocks/SocialMedia.json',
  '/antd/social-media-stats': '/mocks/SocialMedia.json',
  '/antd/scheduled-posts': '/mocks/ScheduledPosts.json',

  // Bidding/Auction
  '/antd/live-auctions': '/mocks/LiveAuction.json',
  '/antd/auction-creators': '/mocks/AuctionCreators.json',
  '/antd/bidding-top-sellers': '/mocks/BiddingTopSellers.json',
  '/antd/bidding-transactions': '/mocks/BiddingTransactions.json',

  // Logistics
  '/antd/trucks': '/mocks/Trucks.json',
  '/antd/truck-deliveries': '/mocks/TruckDeliveries.json',
  '/antd/truck-delivery-requests': '/mocks/TruckDeliveryRequest.json',
  '/antd/delivery-analytics': '/mocks/DeliveryAnalytics.json',

  // Other
  '/antd/notifications': '/mocks/Notifications.json',
  '/antd/session-activity': '/mocks/SessionActivity.json',
  '/antd/timeline-activity': '/mocks/TimelineActivity.json',
  '/antd/social-comments': '/mocks/SocialComments.json',

  // Corporate Pages
  '/antd/employees': '/mocks/Employees.json',
  '/antd/faqs': '/mocks/Faqs.json',
  '/antd/pricing': '/mocks/Pricing.json',
  '/antd/pricings': '/mocks/Pricing.json',
  '/antd/license': '/mocks/License.json',
  '/antd/licenses': '/mocks/License.json',

  // Healthcare Dashboard
  '/antd/patients': '/mocks/Patients.json',
  '/antd/appointments': '/mocks/Appointments.json',
  '/antd/doctors': '/mocks/Doctors.json',
  '/antd/departments': '/mocks/Departments.json',

  // Finance Dashboard
  '/antd/invoices': '/mocks/Invoices.json',
  '/antd/expenses': '/mocks/Expenses.json',
};

/**
 * Convert production API endpoint to mock file path
 * @param endpoint - The production API endpoint
 * @returns The mock file path, or null if no mapping exists
 */
export const convertToMockEndpoint = (endpoint: string): string | null => {
  // Remove query parameters if any
  const cleanEndpoint = endpoint.split('?')[0];

  // Remove trailing slash
  const normalizedEndpoint = cleanEndpoint.replace(/\/$/, '');

  // Try exact match first
  if (ENDPOINT_MOCK_MAP[normalizedEndpoint]) {
    return ENDPOINT_MOCK_MAP[normalizedEndpoint];
  }

  // Try to match patterns for detail endpoints (e.g., /antd/products/123)
  // Extract the base path without the ID
  const pathParts = normalizedEndpoint.split('/');

  // If the last part looks like an ID (number or UUID), try the base path
  const lastPart = pathParts[pathParts.length - 1];
  if (lastPart && (isNumeric(lastPart) || isUUID(lastPart))) {
    const basePath = pathParts.slice(0, -1).join('/');
    if (ENDPOINT_MOCK_MAP[basePath]) {
      return ENDPOINT_MOCK_MAP[basePath];
    }
  }

  // For unmatched endpoints, try to find a partial match
  for (const [key, value] of Object.entries(ENDPOINT_MOCK_MAP)) {
    if (normalizedEndpoint.startsWith(key + '/')) {
      return value;
    }
  }

  // If no mapping found, return null (will use production endpoint)
  console.warn(`[Mock Mapper] No mock file mapping found for: ${endpoint}`);
  return null;
};

/**
 * Check if a string is numeric
 */
function isNumeric(str: string): boolean {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

/**
 * Check if a string is a UUID
 */
function isUUID(str: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/**
 * Check if an endpoint should use mock data
 * Some endpoints might be mock-only (not implemented in backend yet)
 */
export const isMockOnlyEndpoint = (endpoint: string): boolean => {
  const mockOnlyEndpoints = [
    '/antd/notifications',
    '/antd/session-activity',
    '/antd/timeline-activity',
  ];

  return mockOnlyEndpoints.some((mockEndpoint) =>
    endpoint.startsWith(mockEndpoint)
  );
};
