# Quick Fix: useFetchData Type Issues

## Problem

If you see errors like `TypeError: data?.filter is not a function`, it means the data returned by `useFetchData` is not an array as expected.

## Root Cause

This happens when:

1. The hook returns the full API response object instead of just the data array
2. The TypeScript types don't match the actual runtime data

## Solution

### 1. Always Add Type Parameters

```typescript
// ❌ BAD - No type parameter
const { data: projectsData } = useFetchData('../mocks/Projects.json');

// ✅ GOOD - With type parameter
const { data: projectsData = [] } = useFetchData<Projects[]>(
  '../mocks/Projects.json'
);
```

### 2. Always Add Default Values

The `= []` default value ensures `data` is never undefined:

```typescript
// ❌ BAD - No default value
const { data: tasksData } = useFetchData<Tasks[]>('/api/tasks');

// ✅ GOOD - With default value
const { data: tasksData = [] } = useFetchData<Tasks[]>('/api/tasks');
```

### 3. Hook Behavior

The `useFetchData` hook automatically:

- ✅ Detects API response wrappers like `{success, data, message, meta}`
- ✅ Extracts the `data` field automatically
- ✅ Works with both mock JSON arrays and API responses
- ✅ Returns pagination metadata separately

```typescript
// Mock file: [{ id: 1 }, { id: 2 }]
// Hook returns: { data: [{ id: 1 }, { id: 2 }], loading: false, error: null }

// API response: { success: true, data: [{ id: 1 }], meta: {...} }
// Hook returns: { data: [{ id: 1 }], loading: false, error: null, meta: {...} }
```

## Quick Fix for All Pages

Search for all `useFetchData` usage and update them:

```bash
# Find all usages
grep -r "useFetchData" src/pages/dashboards/
```

Then update each one to include:

1. Type parameter: `<YourType[]>`
2. Default value: `= []`

## Examples

### Default Dashboard

```typescript
import { Projects, Tasks, Notifications } from '../../types';

const { data: tasksListData = [] } = useFetchData<Tasks[]>(
  '../mocks/TasksList.json'
);
const { data: projectsData = [] } = useFetchData<Projects[]>(
  '../mocks/Projects.json'
);
const { data: notificationsData = [] } = useFetchData<Notifications[]>(
  '../mocks/Notifications.json'
);
```

### With Real API

```typescript
// Fetching from real API endpoint
const {
  data: tasks = [],
  loading,
  error,
  meta, // Pagination metadata
} = useFetchData<Tasks[]>('/api/v1/antd/tasks?page=1&limit=20');
```

### With Query Parameters

```typescript
import { buildQueryParams } from '../../utils';

const params = { Page: 1, Limit: 20, Status: 'in progress' };
const url = `/api/v1/antd/projects${buildQueryParams(params)}`;

const { data: projects = [], meta } = useFetchData<Projects[]>(url);

// Can use meta for pagination
console.log(meta?.totalPages); // 5
```

## Debugging

If you still get errors, check:

1. **Is data an array at runtime?**

   ```typescript
   console.log('Is array?', Array.isArray(projectsData));
   console.log('Data:', projectsData);
   ```

2. **Check the actual response**

   ```typescript
   const { data, loading } = useFetchData<any>('/your/url', { unwrap: false });
   console.log('Raw response:', data);
   ```

3. **Verify mock file structure**
   - Mock files should be JSON arrays: `[{...}, {...}]`
   - NOT wrapped: `{data: [{...}]}` (hook handles this automatically for APIs)

## Files Updated in This Fix

- ✅ `src/hooks/useFetchData.tsx` - Added `!Array.isArray()` check
- ✅ `src/pages/dashboards/Default.tsx` - Added types and defaults
- ✅ `src/pages/dashboards/Projects.tsx` - Added types and defaults

## Need to Update

Search and update these patterns in other dashboard files:

- Learning.tsx
- Marketing.tsx
- Social.tsx
- Bidding.tsx
- Logistics.tsx
- Ecommerce.tsx
