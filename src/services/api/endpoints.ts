/**
 * API Endpoints Constants
 * Centralized endpoint definitions for the API
 */

export const API_ENDPOINTS = {
  // ==================== AUTHENTICATION ====================
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH_TOKEN: '/api/v1/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // ==================== USER PROFILE ====================
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    CHANGE_PASSWORD: '/profile/change-password',
  },

  // ==================== USER MANAGEMENT ====================
  USERS: {
    LIST: '/users',
    GET: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    ROLES: (id: string) => `/users/${id}/roles`,
    CLAIMS: (id: string) => `/users/${id}/claims`,
    RESET_PASSWORD: (id: string) => `/users/${id}/reset-password`,
  },

  // ==================== AUDIT LOGS ====================
  AUDIT: {
    LIST: '/audit',
    GET_BY_INVOICE: (invoiceId: string) => `/audit/invoice/${invoiceId}`,
  },

  // ==================== COUNTRIES & LANGUAGES ====================
  COUNTRIES: {
    LIST: '/countries',
    GET: (code: string) => `/countries/${code}`,
  },

  LANGUAGES: {
    LIST: '/languages',
    GET: (code: string) => `/languages/${code}`,
  },

  // ==================== PRODUCTS (GENERAL) ====================
  PRODUCTS: {
    LIST: '/products',
    GET: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    BY_CATEGORY: (category: string) => `/products/category/${category}`,
    FEATURED: '/products/featured',
    LOW_STOCK: '/products/low-stock',
    UPDATE_STOCK: (id: string) => `/products/${id}/stock`,
  },

  // ==================== DASHBOARD ====================
  DASHBOARD: {
    // Products
    PRODUCTS: {
      LIST: '/antd/products',
      GET: (id: string) => `/antd/products/${id}`,
      CREATE: '/antd/products',
      UPDATE: (id: string) => `/antd/products/${id}`,
      DELETE: (id: string) => `/antd/products/${id}`,
      TOP: '/antd/products/top',
      CATEGORIES: '/antd/products/categories',
    },

    // Orders
    ORDERS: {
      LIST: '/antd/orders',
      GET: (id: string) => `/antd/orders/${id}`,
      CREATE: '/antd/orders',
      UPDATE: (id: string) => `/antd/orders/${id}`,
      DELETE: (id: string) => `/antd/orders/${id}`,
      RECENT: '/antd/orders/recent',
    },

    // Sellers
    SELLERS: {
      LIST: '/antd/sellers',
      GET: (id: string) => `/antd/sellers/${id}`,
      CREATE: '/antd/sellers',
      UPDATE: (id: string) => `/antd/sellers/${id}`,
      DELETE: (id: string) => `/antd/sellers/${id}`,
      TOP: '/antd/sellers/top',
    },

    // Projects
    PROJECTS: {
      LIST: '/antd/projects',
      GET: (id: string) => `/antd/projects/${id}`,
      CREATE: '/antd/projects',
      UPDATE: (id: string) => `/antd/projects/${id}`,
      DELETE: (id: string) => `/antd/projects/${id}`,
    },

    // Clients
    CLIENTS: {
      LIST: '/antd/clients',
      GET: (id: string) => `/antd/clients/${id}`,
      CREATE: '/antd/clients',
      UPDATE: (id: string) => `/antd/clients/${id}`,
      DELETE: (id: string) => `/antd/clients/${id}`,
    },

    // Tasks
    TASKS: {
      LIST: '/antd/tasks',
      GET: (id: string) => `/antd/tasks/${id}`,
      CREATE: '/antd/tasks',
      UPDATE: (id: string) => `/antd/tasks/${id}`,
      DELETE: (id: string) => `/antd/tasks/${id}`,
    },

    // Campaign Ads
    CAMPAIGN_ADS: {
      LIST: '/antd/campaign-ads',
      GET: (id: string) => `/antd/campaign-ads/${id}`,
      CREATE: '/antd/campaign-ads',
      UPDATE: (id: string) => `/antd/campaign-ads/${id}`,
      DELETE: (id: string) => `/antd/campaign-ads/${id}`,
    },

    // Courses
    COURSES: {
      LIST: '/antd/courses',
      GET: (id: string) => `/antd/courses/${id}`,
    },

    RECOMMENDED_COURSES: {
      LIST: '/antd/recommended-courses',
      GET: (id: string) => `/antd/recommended-courses/${id}`,
    },

    // Exams
    EXAMS: {
      LIST: '/antd/exams',
      GET: (id: string) => `/antd/exams/${id}`,
    },

    // Study Statistics
    STUDY_STATISTICS: {
      LIST: '/antd/study-statistics',
      GET: (id: string) => `/antd/study-statistics/${id}`,
    },

    // Community Groups
    COMMUNITY_GROUPS: {
      LIST: '/antd/community-groups',
      GET: (id: string) => `/antd/community-groups/${id}`,
    },

    // Social Media
    SOCIAL_MEDIA_ACTIVITIES: {
      LIST: '/antd/social-media-activities',
      GET: (id: string) => `/antd/social-media-activities/${id}`,
    },

    SOCIAL_MEDIA_STATS: {
      LIST: '/antd/social-media-stats',
      GET: (id: string) => `/antd/social-media-stats/${id}`,
    },

    SCHEDULED_POSTS: {
      LIST: '/antd/scheduled-posts',
      GET: (id: string) => `/antd/scheduled-posts/${id}`,
    },

    // Bidding/Auction
    LIVE_AUCTIONS: {
      LIST: '/antd/live-auctions',
      GET: (id: string) => `/antd/live-auctions/${id}`,
    },

    AUCTION_CREATORS: {
      LIST: '/antd/auction-creators',
      GET: (id: string) => `/antd/auction-creators/${id}`,
    },

    BIDDING_TOP_SELLERS: {
      LIST: '/antd/bidding-top-sellers',
      GET: (id: string) => `/antd/bidding-top-sellers/${id}`,
    },

    BIDDING_TRANSACTIONS: {
      LIST: '/antd/bidding-transactions',
      GET: (id: string) => `/antd/bidding-transactions/${id}`,
    },

    // Logistics/Delivery
    TRUCKS: {
      LIST: '/antd/trucks',
      GET: (id: string) => `/antd/trucks/${id}`,
      CREATE: '/antd/trucks',
      UPDATE: (id: string) => `/antd/trucks/${id}`,
      DELETE: (id: string) => `/antd/trucks/${id}`,
    },

    TRUCK_DELIVERIES: {
      LIST: '/antd/truck-deliveries',
      GET: (id: string) => `/antd/truck-deliveries/${id}`,
      CREATE: '/antd/truck-deliveries',
      UPDATE: (id: string) => `/antd/truck-deliveries/${id}`,
      DELETE: (id: string) => `/antd/truck-deliveries/${id}`,
    },

    TRUCK_DELIVERY_REQUESTS: {
      LIST: '/antd/truck-delivery-requests',
      GET: (id: string) => `/antd/truck-delivery-requests/${id}`,
      CREATE: '/antd/truck-delivery-requests',
      UPDATE: (id: string) => `/antd/truck-delivery-requests/${id}`,
      DELETE: (id: string) => `/antd/truck-delivery-requests/${id}`,
    },

    DELIVERY_ANALYTICS: {
      LIST: '/antd/delivery-analytics',
      GET: (id: string) => `/antd/delivery-analytics/${id}`,
      CREATE: '/antd/delivery-analytics',
      UPDATE: (id: string) => `/antd/delivery-analytics/${id}`,
      DELETE: (id: string) => `/antd/delivery-analytics/${id}`,
    },
  },

  // ==================== MANTINE DASHBOARD ====================
  MANTINE: {
    // Chats
    CHATS: {
      LIST: '/mantine/chats',
      GET: (id: string) => `/mantine/chats/${id}`,
      CREATE: '/mantine/chats',
      UPDATE: (id: string) => `/mantine/chats/${id}`,
      DELETE: (id: string) => `/mantine/chats/${id}`,
    },

    CHAT_ITEMS: {
      LIST: '/mantine/chat-items',
      GET: (id: string) => `/mantine/chat-items/${id}`,
      CREATE: '/mantine/chat-items',
      DELETE: (id: string) => `/mantine/chat-items/${id}`,
    },

    // Files & Folders
    FILES: {
      LIST: '/mantine/files',
      GET: (id: string) => `/mantine/files/${id}`,
      CREATE: '/mantine/files',
      UPDATE: (id: string) => `/mantine/files/${id}`,
      DELETE: (id: string) => `/mantine/files/${id}`,
    },

    FOLDERS: {
      LIST: '/mantine/folders',
      GET: (id: string) => `/mantine/folders/${id}`,
      CREATE: '/mantine/folders',
      UPDATE: (id: string) => `/mantine/folders/${id}`,
      DELETE: (id: string) => `/mantine/folders/${id}`,
    },

    FILE_ACTIVITIES: {
      LIST: '/mantine/file-activities',
    },

    // Invoices
    INVOICES: {
      LIST: '/mantine/invoices',
      GET: (id: string) => `/mantine/invoices/${id}`,
      CREATE: '/mantine/invoices',
      UPDATE: (id: string) => `/mantine/invoices/${id}`,
      DELETE: (id: string) => `/mantine/invoices/${id}`,
    },

    // Kanban
    KANBAN_TASKS: {
      LIST: '/mantine/kanban-tasks',
      GET: (id: string) => `/mantine/kanban-tasks/${id}`,
      CREATE: '/mantine/kanban-tasks',
      UPDATE: (id: string) => `/mantine/kanban-tasks/${id}`,
      DELETE: (id: string) => `/mantine/kanban-tasks/${id}`,
    },

    // Orders
    ORDERS: {
      LIST: '/mantine/orders',
      GET: (id: string) => `/mantine/orders/${id}`,
      CREATE: '/mantine/orders',
      UPDATE: (id: string) => `/mantine/orders/${id}`,
      DELETE: (id: string) => `/mantine/orders/${id}`,
    },

    // Projects
    PROJECTS: {
      LIST: '/mantine/projects',
      GET: (id: string) => `/mantine/projects/${id}`,
      CREATE: '/mantine/projects',
      UPDATE: (id: string) => `/mantine/projects/${id}`,
      DELETE: (id: string) => `/mantine/projects/${id}`,
    },

    // Sales
    SALES: {
      LIST: '/mantine/sales',
      GET: (id: string) => `/mantine/sales/${id}`,
      CREATE: '/mantine/sales',
      UPDATE: (id: string) => `/mantine/sales/${id}`,
      DELETE: (id: string) => `/mantine/sales/${id}`,
    },

    // Stats
    STATS: {
      LIST: '/mantine/stats',
      GET: (id: string) => `/mantine/stats/${id}`,
      ALL: '/mantine/stats/all',
    },

    // Traffic
    TRAFFIC: {
      LIST: '/mantine/traffic',
    },

    // User Profile
    USER_PROFILE: {
      GET: '/mantine/user-profile',
    },
  },
} as const;
