/**
 * Task priority levels (as returned by API)
 * 0 = Low, 1 = Medium, 2 = High
 */
export type TaskPriority = 0 | 1 | 2;

/**
 * Task status (as returned by API)
 * 0 = Not Started, 1 = In Progress, 2 = Completed
 */
export type TaskStatus = 0 | 1 | 2;

/**
 * Task category (as returned by API)
 * Numeric values representing different categories
 */
export type TaskCategory = number;

/**
 * Task color (as returned by API)
 * Numeric values representing different colors
 */
export type TaskColor = number;

export type Tasks = {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  due_date: string;
  assigned_to: string;
  status: TaskStatus;
  notes: string;
  category: TaskCategory;
  duration: number;
  completed_date: string;
  color: TaskColor;
};
