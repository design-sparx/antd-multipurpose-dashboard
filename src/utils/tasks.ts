/**
 * Task utility functions
 * Helper functions to work with task data from the API
 */

import type { TaskPriority, TaskStatus, TaskCategory, TaskColor } from '../types';

/**
 * Map task priority number to label
 */
export const getTaskPriorityLabel = (priority: TaskPriority): string => {
  const labels = {
    0: 'Low',
    1: 'Medium',
    2: 'High',
  };
  return labels[priority];
};

/**
 * Map task status number to label
 */
export const getTaskStatusLabel = (status: TaskStatus): string => {
  const labels = {
    0: 'Not Started',
    1: 'In Progress',
    2: 'Completed',
  };
  return labels[status];
};

/**
 * Map task status number to badge status
 */
export const getTaskStatusBadge = (
  status: TaskStatus
): 'success' | 'processing' | 'warning' | 'default' => {
  const badges = {
    0: 'warning' as const,
    1: 'processing' as const,
    2: 'success' as const,
  };
  return badges[status];
};

/**
 * Map task category number to label
 */
export const getTaskCategoryLabel = (category: TaskCategory): string => {
  const labels: Record<number, string> = {
    0: 'General',
    1: 'Development',
    2: 'Design',
    3: 'Marketing',
    4: 'Sales',
    5: 'Support',
    6: 'HR',
    7: 'Finance',
    8: 'Operations',
    9: 'Other',
  };
  return labels[category] || `Category ${category}`;
};

/**
 * Map task color number to color name
 */
export const getTaskColorName = (color: TaskColor): string => {
  const colors: Record<number, string> = {
    0: 'red',
    1: 'orange',
    2: 'gold',
    3: 'lime',
    4: 'green',
    5: 'cyan',
    6: 'blue',
    7: 'purple',
    8: 'magenta',
  };
  return colors[color] || 'default';
};
