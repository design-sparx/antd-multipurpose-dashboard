# API Service Layer Synchronization

## Overview

This document describes the changes made to synchronize the frontend API service layer with the actual API responses from the backend.

## Problem Identified

The original API service layer was not correctly reflecting the actual API response structure:

1. **Missing Response Wrappers**: Types only defined data models (`Tasks`, `Projects`) without the API response wrappers
2. **Different Response Structures**:
   - Tasks API: `{ success, data, message, timestamp, meta }`
   - Projects API: `{ succeeded, data, message, errors, meta }`
3. **Incorrect Field Types**: Task fields (priority, status, category, color) were typed as `string` but the API returns `number`
4. **No Pagination Support**: Missing `PaginationMeta` type

## Changes Made

### 1. New Type Definitions (`src/types/api.ts`)

Created comprehensive API response wrapper types:

```typescript
// Pagination metadata
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// Tasks API response (uses "success")
export type TasksApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  meta: PaginationMeta;
};

// Projects API response (uses "succeeded")
export type ProjectsApiResponse<T> = {
  succeeded: boolean;
  message: string;
  data: T;
  errors: string[];
  meta: PaginationMeta;
};

// Generic API response
export type ApiResponse<T> = {
  success?: boolean;
  succeeded?: boolean;
  data: T;
  message: string;
  timestamp?: string;
  errors?: string[];
  meta?: PaginationMeta;
};
```

### 2. Updated Task Types (`src/types/dashboard.ts`)

Updated task types to match API response structure:

```typescript
export type TaskPriority = 0 | 1 | 2;  // 0=Low, 1=Medium, 2=High
export type TaskStatus = 0 | 1 | 2;    // 0=Not Started, 1=In Progress, 2=Completed
export type TaskCategory = number;
export type TaskColor = number;

export type Tasks = {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;        // Changed from string to number
  due_date: string;
  assigned_to: string;
  status: TaskStatus;            // Changed from string to number
  notes: string;
  category: TaskCategory;        // Changed from string to number
  duration: number;
  completed_date: string;
  color: TaskColor;              // Changed from string to number
};
```

### 3. Enhanced `useFetchData` Hook (`src/hooks/useFetchData.tsx`)

Updated the hook to automatically extract data from API response wrappers:

**Features:**
- Automatic detection of API response wrapper pattern
- Extracts `data` field by default
- Returns pagination metadata, message, and success status
- Option to get raw response with `unwrap: false`
- Proper error handling with `Error` type

**Usage:**
```typescript
// Automatically extracts data array
const { data, loading, error, meta } = useFetchData<Tasks[]>('/api/v1/antd/tasks');

// Get full API response
const { data, loading, error } = useFetchData<TasksApiResponse<Tasks[]>>('/api/v1/antd/tasks', { unwrap: false });
```

### 4. Task Utility Functions (`src/utils/tasks.ts`)

Created helper functions to convert numeric API values to display labels:

```typescript
getTaskPriorityLabel(priority: TaskPriority): string
getTaskStatusLabel(status: TaskStatus): string
getTaskStatusBadge(status: TaskStatus): 'success' | 'processing' | 'warning' | 'default'
getTaskCategoryLabel(category: TaskCategory): string
getTaskColorName(color: TaskColor): string
```

### 5. API Service Utilities (`src/utils/api.ts`)

Created comprehensive API service utilities:

```typescript
// Check if response is successful
isApiSuccess<T>(response): boolean

// Extract data safely
extractData<T>(response): T

// Extract pagination meta
extractMeta<T>(response): PaginationMeta | undefined

// Extract errors
extractErrors<T>(response): string[]

// Build query parameters
buildQueryParams(params): string

// Example service functions
ApiService.getTasks(params?: TasksQueryParams)
ApiService.getProjects(params?: ProjectsQueryParams)
```

### 6. Updated Components

- **TasksListCard**: Updated to use helper functions for displaying task data

## API Response Examples

### Tasks Endpoint Response

```json
{
  "success": true,
  "data": [
    {
      "id": "fa5550c8-54c5-4f3c-b9a5-1d2ce5723831",
      "name": "Prepare marketing presentation - Task 61",
      "description": "This is a detailed description...",
      "priority": 0,
      "due_date": "2/15/2026",
      "assigned_to": "Con Duckering",
      "status": 0,
      "notes": "Additional notes...",
      "category": 1,
      "duration": 5.97,
      "completed_date": "",
      "color": 1
    }
  ],
  "message": "Tasks retrieved successfully",
  "timestamp": "2025-11-20T20:17:51.0183796Z",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Projects Endpoint Response

```json
{
  "succeeded": true,
  "message": "Projects retrieved successfully",
  "data": [
    {
      "project_id": "dabdb2c3-d440-4506-a0b5-99dcfc376e0b",
      "project_name": "Real Estate Portal",
      "start_date": "2025-11-14",
      "end_date": "2026-03-19",
      "budget": "AUD",
      "project_manager": "Sophie Lee",
      "client_name": "PropertyHub",
      "status": "in progress",
      "priority": "high",
      "team_size": 10,
      "project_description": "Comprehensive real estate listing platform...",
      "project_location": "Sydney",
      "project_type": "development",
      "project_category": "real estate",
      "project_duration": 4.00
    }
  ],
  "errors": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 10,
    "totalPages": 1
  }
}
```

## Value Mappings

### Task Priority
- `0` → "Low"
- `1` → "Medium"
- `2` → "High"

### Task Status
- `0` → "Not Started" (warning badge)
- `1` → "In Progress" (processing badge)
- `2` → "Completed" (success badge)

### Task Category
- `0` → "General"
- `1` → "Development"
- `2` → "Design"
- `3` → "Marketing"
- `4` → "Sales"
- `5` → "Support"
- `6` → "HR"
- `7` → "Finance"
- `8` → "Operations"
- `9` → "Other"

### Task Colors
- `0` → "red"
- `1` → "orange"
- `2` → "gold"
- `3` → "lime"
- `4` → "green"
- `5` → "cyan"
- `6` → "blue"
- `7` → "purple"
- `8` → "magenta"

## Migration Guide

### For Existing Code

1. **Using useFetchData**: No changes needed! The hook now automatically extracts the `data` field from API responses while maintaining backward compatibility with mock JSON files.

2. **Working with Tasks**: Use the helper functions when displaying task data:

```typescript
import { getTaskPriorityLabel, getTaskStatusBadge } from '../utils';

// Before
<Tag>{task.priority}</Tag>  // Would show number

// After
<Tag>{getTaskPriorityLabel(task.priority)}</Tag>  // Shows "High"
```

3. **Type Safety**: Import the new types:

```typescript
import type { TasksApiResponse, ProjectsApiResponse, PaginationMeta } from '../types';
```

## Benefits

1. **Type Safety**: Full TypeScript support for API responses
2. **Consistency**: Matches actual API structure from backend
3. **Auto-unwrapping**: Automatic extraction of data from response wrappers
4. **Pagination Support**: Built-in pagination metadata handling
5. **Error Handling**: Proper error types and handling
6. **Backward Compatible**: Works with both mock JSON files and API responses

## Testing

The types and utilities have been tested to ensure:
- ✅ Backward compatibility with existing mock data
- ✅ Proper unwrapping of API responses
- ✅ Type safety across all components
- ✅ Correct display of numeric values using helper functions

## Future Enhancements

Consider adding:
1. Query parameter builders for filtering and sorting
2. Request interceptors for authentication
3. Response caching layer
4. Optimistic updates for mutations
5. WebSocket support for real-time updates
