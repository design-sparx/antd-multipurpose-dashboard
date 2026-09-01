import { usePageContext } from './usePageContext.tsx';

export { usePageContext };

// Auth hook (re-export from context)
export { useAuth } from '../contexts/AuthContext';

// Theme hook
export { useDataTheme } from './useDataTheme';

// Dashboard data hooks (re-export from lib/queries)
export * from '../lib/queries';

// Announcements feed
export {
  useAnnouncements,
  formatRelativeDate,
  type Announcement,
  type AnnouncementTag,
} from '../lib/hooks/use-announcements';
