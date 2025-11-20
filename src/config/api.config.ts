/**
 * API Configuration
 * Manages API endpoints for both mock and production environments
 */

export const API_CONFIG = {
  // Base URLs for different environments
  MOCK_BASE_URL: '/mocks',
  PROD_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com/api',

  // Default to mock data (can be overridden by environment variable)
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || import.meta.env.VITE_USE_MOCK_DATA === undefined,
};

/**
 * API Endpoints mapping
 * Maps resource names to their respective endpoints
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
    mock: '/TopSeller.json',
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
export const getEndpoint = (resource: keyof typeof API_ENDPOINTS, useMockData: boolean): string => {
  const endpoint = API_ENDPOINTS[resource];

  if (!endpoint) {
    console.warn(`No endpoint configuration found for resource: ${resource}`);
    return '';
  }

  if (useMockData) {
    return `${API_CONFIG.MOCK_BASE_URL}${endpoint.mock}`;
  }

  return `${API_CONFIG.PROD_BASE_URL}${endpoint.prod}`;
};

/**
 * Build a full URL for fetching data
 */
export const buildApiUrl = (url: string, useMockData: boolean): string => {
  // If URL is already absolute, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If URL starts with /mocks or ../mocks, it's a mock URL
  if (url.includes('/mocks/')) {
    if (useMockData) {
      return url;
    }
    // Extract the filename and try to find the corresponding endpoint
    const filename = url.split('/').pop()?.replace('.json', '');
    if (filename) {
      // Try to find in API_ENDPOINTS
      const resourceKey = Object.keys(API_ENDPOINTS).find(key => {
        const endpoint = API_ENDPOINTS[key as keyof typeof API_ENDPOINTS];
        return endpoint.mock.includes(filename);
      });

      if (resourceKey) {
        return getEndpoint(resourceKey as keyof typeof API_ENDPOINTS, useMockData);
      }
    }
    // Fallback: convert mock path to prod path
    const resource = filename?.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${API_CONFIG.PROD_BASE_URL}/${resource}`;
  }

  // If it's a relative URL, determine which base to use
  if (useMockData) {
    return url.startsWith('/') ? url : `/${url}`;
  }

  return `${API_CONFIG.PROD_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};
