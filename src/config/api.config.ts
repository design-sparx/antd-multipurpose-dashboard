/**
 * API Configuration
 * Manages API endpoints for both mock and production environments
 */

export const API_CONFIG = {
  // Base URLs for different environments
  MOCK_BASE_URL: '/mocks',
  PROD_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',

  // API version and dashboard prefix
  API_VERSION: '/api/v1',
  DASHBOARD_PREFIX: '/antd',

  // Always use mock data (hardcoded to true)
  USE_MOCK_DATA: true,
};

/**
 * Get the full API base path (includes version and dashboard prefix)
 */
export const getApiBasePath = (): string => {
  return `${API_CONFIG.PROD_BASE_URL}${API_CONFIG.API_VERSION}${API_CONFIG.DASHBOARD_PREFIX}`;
};

/**
 * API Endpoints mapping
 * Maps resource names to their respective endpoints
 *
 * Set mockOnly: true for endpoints that aren't implemented on the backend yet.
 * These will always return mock data, even in Live Mode.
 */
export const API_ENDPOINTS = {
  // Dashboard - Default
  tasks: {
    mock: '/TasksList.json',
    prod: '/tasks',
  },
  projects: {
    mock: '/Projects.json',
    prod: '/projects',
  },
  notifications: {
    mock: '/Notifications.json',
    prod: '/notifications',
    mockOnly: true, // Backend endpoint not implemented yet
  },
  countryOrders: {
    mock: '/CountryOrders.json',
    prod: '/orders/by-country',
  },
  recentOrders: {
    mock: '/RecentOrders.json',
    prod: '/orders/recent',
  },

  // Dashboard - E-commerce
  campaigns: {
    mock: '/Campaigns.json',
    prod: '/campaigns',
  },
  campaignsAds: {
    mock: '/CampaignsAds.json',
    prod: '/campaigns/ads',
  },
  topSeller: {
    mock: '/TopSellers.json',
    prod: '/sellers/top',
  },
  topCategories: {
    mock: '/TopCategories.json',
    prod: '/categories/top',
  },

  // Dashboard - Learning
  courses: {
    mock: '/Courses.json',
    prod: '/courses',
  },
  recommendedCourses: {
    mock: '/RecommendedCourses.json',
    prod: '/courses/recommended',
  },
  exams: {
    mock: '/Exams.json',
    prod: '/exams',
  },
  communityGroups: {
    mock: '/CommunityGroups.json',
    prod: '/community/groups',
  },

  // Dashboard - NFT
  biddingTransactions: {
    mock: '/BiddingTransactions.json',
    prod: '/bidding/transactions',
  },
  biddingTopSellers: {
    mock: '/BiddingTopSellers.json',
    prod: '/bidding/top-sellers',
  },
  auctionCreators: {
    mock: '/AuctionCreators.json',
    prod: '/auction/creators',
  },
  liveAuction: {
    mock: '/LiveAuction.json',
    prod: '/auction/live',
  },

  // Dashboard - Logistics
  deliveryAnalytics: {
    mock: '/DeliveryAnalytics.json',
    prod: '/delivery/analytics',
  },
  truckDeliveryRequest: {
    mock: '/TruckDeliveryRequest.json',
    prod: '/delivery/truck-requests',
  },

  // User Account
  sessionActivity: {
    mock: '/SessionActivity.json',
    prod: '/user/session-activity',
  },
  timelineActivity: {
    mock: '/TimelineActivity.json',
    prod: '/user/timeline-activity',
  },

  // Other
  clients: {
    mock: '/Clients.json',
    prod: '/clients',
  },
  employees: {
    mock: '/Employees.json',
    prod: '/employees',
  },
  socialComments: {
    mock: '/SocialComments.json',
    prod: '/social/comments',
  },
  scheduledPosts: {
    mock: '/ScheduledPosts.json',
    prod: '/social/scheduled-posts',
  },
  faqs: {
    mock: '/Faqs.json',
    prod: '/faqs',
  },
  pricing: {
    mock: '/Pricing.json',
    prod: '/pricing',
  },
  license: {
    mock: '/License.json',
    prod: '/license',
  },
};

/**
 * Get the appropriate endpoint based on the current mode
 */
export const getEndpoint = (
  resource: keyof typeof API_ENDPOINTS,
  useMockData: boolean
): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const endpoint = API_ENDPOINTS[resource] as any;

  if (!endpoint) {
    console.warn(`No endpoint configuration found for resource: ${resource}`);
    return '';
  }

  // Check if this endpoint is mock-only (not implemented on backend)
  if (endpoint.mockOnly) {
    if (!useMockData) {
      console.warn(
        `[API Config] ⚠️ Endpoint "${resource}" is mock-only (backend not implemented). Using mock data in Live Mode.`
      );
    }
    return `${API_CONFIG.MOCK_BASE_URL}${endpoint.mock}`;
  }

  if (useMockData) {
    return `${API_CONFIG.MOCK_BASE_URL}${endpoint.mock}`;
  }

  // Return full API path with version and dashboard prefix
  return `${getApiBasePath()}${endpoint.prod}`;
};

/**
 * Build a full URL for fetching data
 */
export const buildApiUrl = (url: string, useMockData: boolean): string => {
  // If URL is already absolute, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.log(`[API Config] Using absolute URL: ${url}`);
    return url;
  }

  // If URL starts with /mocks or ../mocks, it's a mock URL
  if (url.includes('/mocks/')) {
    if (useMockData) {
      console.log(`[API Config] Mock mode: ${url}`);
      return url;
    }
    // Extract the filename and try to find the corresponding endpoint
    const filename = url.split('/').pop()?.replace('.json', '');
    if (filename) {
      // Try to find in API_ENDPOINTS
      const resourceKey = Object.keys(API_ENDPOINTS).find((key) => {
        const endpoint = API_ENDPOINTS[key as keyof typeof API_ENDPOINTS];
        return endpoint.mock.includes(filename);
      });

      if (resourceKey) {
        const builtUrl = getEndpoint(
          resourceKey as keyof typeof API_ENDPOINTS,
          useMockData
        );
        console.log(`[API Config] Live mode: ${url} → ${builtUrl}`);
        return builtUrl;
      }
    }
    // Fallback: convert mock path to prod path with full API prefix
    const resource = filename
      ?.toLowerCase()
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase();
    const fallbackUrl = `${getApiBasePath()}/${resource}`;
    console.log(`[API Config] Live mode (fallback): ${url} → ${fallbackUrl}`);
    return fallbackUrl;
  }

  // If it's a relative URL, determine which base to use
  if (useMockData) {
    const mockUrl = url.startsWith('/') ? url : `/${url}`;
    console.log(`[API Config] Mock mode (relative): ${url} → ${mockUrl}`);
    return mockUrl;
  }

  // For production, add the full API path prefix
  const prodUrl = `${getApiBasePath()}${url.startsWith('/') ? url : `/${url}`}`;
  console.log(`[API Config] Live mode (relative): ${url} → ${prodUrl}`);
  return prodUrl;
};
