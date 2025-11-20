# TypeScript Usage Guide

This guide explains how to use the mock data toggle feature with proper TypeScript types.

## The Problem with `any`

Previously, the code used `any` types everywhere, which:
- ❌ Defeats the purpose of TypeScript
- ❌ Allows runtime errors to slip through
- ❌ Makes refactoring dangerous
- ❌ Provides no IDE autocomplete
- ❌ Hides bugs until production

## The Type-Safe Solution

The `useFetchData` hook is now a **generic function** that requires you to specify the expected data type.

### Basic Usage

#### For Array Data (Most Common)

```typescript
import useFetchData from '../hooks/useFetchData';
import { Project } from '../types/projects';

function ProjectsPage() {
  // Specify that data will be Project[]
  const { data, loading, error } = useFetchData<Project[]>('/mocks/Projects.json');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // TypeScript KNOWS data is Project[] | null
  // You must handle the null case
  if (!data) return <div>No data</div>;

  // Now TypeScript knows data is Project[]
  // Autocomplete works! No spread errors!
  return (
    <div>
      {data.map(project => (
        <div key={project.project_id}>{project.project_name}</div>
      ))}
    </div>
  );
}
```

#### For Object Data

```typescript
import useFetchData from '../hooks/useFetchData';
import { User } from '../types/user';

function UserProfile() {
  // Specify that data will be a User object
  const { data: user, loading, error } = useFetchData<User>('/api/user/profile');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user data</div>;

  // TypeScript knows user is User object
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Handling Null Values

The hook returns `data: T | null` because data might not be loaded yet. You have several options:

#### Option 1: Null Check (Recommended)

```typescript
const { data, loading, error } = useFetchData<Project[]>('/mocks/Projects.json');

if (!data) return <Loader />;

// TypeScript now knows data is Project[] (not null)
return <ProjectTable projects={data} />;
```

#### Option 2: Default Value

```typescript
const { data, loading, error } = useFetchData<Project[]>('/mocks/Projects.json');

// Provide empty array as fallback
const projects = data ?? [];

return <ProjectTable projects={projects} />;
```

#### Option 3: Optional Chaining

```typescript
const { data, loading, error } = useFetchData<Project[]>('/mocks/Projects.json');

return (
  <div>
    {data?.map(project => (
      <div key={project.project_id}>{project.project_name}</div>
    ))}
  </div>
);
```

## Creating Type Definitions

### For Existing Mock Files

Look at your mock JSON file and create a matching TypeScript interface:

**Mock File** (`/public/mocks/Projects.json`):
```json
[
  {
    "project_id": "abc123",
    "project_name": "My Project",
    "status": "in progress",
    "budget": "USD",
    "team_size": 5
  }
]
```

**Type Definition** (`/src/types/projects.ts`):
```typescript
export interface Project {
  project_id: string;
  project_name: string;
  status: 'in progress' | 'completed' | 'on hold';
  budget: string;
  team_size: number;
  // ... other fields
}
```

**Usage**:
```typescript
import { Project } from '../types/projects';
const { data } = useFetchData<Project[]>('/mocks/Projects.json');
```

### For Nested Data

```typescript
export interface Campaign {
  id: string;
  name: string;
  ads: CampaignAd[];  // Nested type
}

export interface CampaignAd {
  ad_id: string;
  title: string;
  impressions: number;
}

// Usage
const { data } = useFetchData<Campaign[]>('/mocks/Campaigns.json');
```

## Common Patterns

### Loading State

```typescript
const { data, loading, error } = useFetchData<Project[]>('/mocks/Projects.json');

if (loading) {
  return <Skeleton />;
}

if (error) {
  return <Alert message={error.message} type="error" />;
}

if (!data || data.length === 0) {
  return <Empty description="No projects found" />;
}

return <ProjectList projects={data} />;
```

### Filtering Data

```typescript
const { data, loading } = useFetchData<Project[]>('/mocks/Projects.json');

// TypeScript knows data is Project[] | null
const activeProjects = data?.filter(p => p.status === 'in progress') ?? [];
const completedProjects = data?.filter(p => p.status === 'completed') ?? [];
```

### Combining Multiple Fetches

```typescript
function Dashboard() {
  const { data: projects } = useFetchData<Project[]>('/mocks/Projects.json');
  const { data: tasks } = useFetchData<Task[]>('/mocks/TasksList.json');
  const { data: clients } = useFetchData<Client[]>('/mocks/Clients.json');

  // All properly typed!
  const activeProjects = projects?.filter(p => p.status === 'in progress') ?? [];
  const pendingTasks = tasks?.filter(t => !t.completed) ?? [];
  const allClients = clients ?? [];

  return (
    <div>
      <h2>Active Projects: {activeProjects.length}</h2>
      <h2>Pending Tasks: {pendingTasks.length}</h2>
      <h2>Total Clients: {allClients.length}</h2>
    </div>
  );
}
```

## Benefits of Type-Safe Approach

✅ **Compile-Time Safety**: Errors caught before runtime
✅ **IDE Autocomplete**: IntelliSense shows available properties
✅ **Refactoring Safety**: Rename fields with confidence
✅ **Self-Documenting**: Types serve as documentation
✅ **No Spread Errors**: TypeScript prevents iterator misuse
✅ **Better Debugging**: Clear error messages

## Migration Guide

If you have existing code using the old `any` types:

**Before (Unsafe)**:
```typescript
const { data: projectsData = [] } = useFetchData('../mocks/Projects.json');
// projectsData is any[]
// No type checking, no autocomplete
```

**After (Type-Safe)**:
```typescript
import { Project } from '../types/projects';

const { data } = useFetchData<Project[]>('../mocks/Projects.json');
const projects = data ?? [];
// projects is Project[]
// Full type checking and autocomplete!
```

## Troubleshooting

### Error: "Type 'null' is not assignable to type 'T[]'"

**Problem**: You're not handling the null case.

**Solution**: Use null check or provide default:
```typescript
// Option 1: Null check
if (!data) return <div>Loading...</div>;
// data is now T[], not T | null

// Option 2: Default value
const safeData = data ?? [];
```

### Error: "Object is possibly 'null'"

**Problem**: TypeScript knows data could be null.

**Solution**: This is good! Handle it properly:
```typescript
// Use optional chaining
data?.map(...)

// Or null check
if (data) {
  data.map(...)
}
```

### Error: "Property 'X' does not exist on type 'Y'"

**Problem**: Your type definition doesn't match the actual data.

**Solution**: Update your type definition to match the mock file or API response.

## Best Practices

1. **Always specify the type parameter**:
   ```typescript
   useFetchData<Project[]>(...)  // ✅ Good
   useFetchData(...)             // ❌ Defaults to unknown
   ```

2. **Create reusable type definitions**:
   ```typescript
   // src/types/projects.ts
   export interface Project { ... }

   // Multiple files can import and use
   import { Project } from '../types/projects';
   ```

3. **Handle all states**:
   ```typescript
   if (loading) return <Loader />;
   if (error) return <Error />;
   if (!data) return <Empty />;
   // Now safe to use data
   ```

4. **Use type guards for complex logic**:
   ```typescript
   function isProject(item: unknown): item is Project {
     return typeof item === 'object' && item !== null && 'project_id' in item;
   }
   ```

5. **Leverage TypeScript's inference**:
   ```typescript
   const projects = data ?? [];
   // TypeScript infers: Project[]
   ```

## Conclusion

By using proper TypeScript types instead of `any`, you get:
- Compile-time error detection
- Better IDE support
- Self-documenting code
- Confidence in refactoring
- Prevention of runtime errors

This approach makes your codebase more maintainable and catches bugs before they reach production! 🎉
