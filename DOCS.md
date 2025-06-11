# Portfolio Payload Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Configuration](#configuration)
5. [Collections](#collections)
6. [API Reference](#api-reference)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Development Guidelines](#development-guidelines)
10. [Troubleshooting](#troubleshooting)

## Overview

This is a modern portfolio website built with Next.js 15, Payload CMS 3.0, TypeScript, and Tailwind CSS. The application features a headless CMS architecture with authentication, content management, and a responsive frontend.

### Key Features

- **Headless CMS**: Powered by Payload CMS 3.0
- **Authentication**: Clerk integration for user management
- **Database**: Vercel Postgres with connection pooling
- **Storage**: Vercel Blob Storage for media files
- **Email**: Resend integration for transactional emails
- **Search**: Client-side search functionality
- **Comments**: Utterances GitHub-based commenting system
- **Analytics**: Vercel Analytics and Speed Insights
- **PWA Ready**: Service worker and manifest configuration

### Tech Stack

```json
{
  "frontend": ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS"],
  "backend": ["Payload CMS 3.0", "Node.js"],
  "database": ["Vercel Postgres", "Drizzle ORM"],
  "auth": ["Clerk"],
  "storage": ["Vercel Blob Storage"],
  "email": ["Resend"],
  "deployment": ["Vercel"],
  "testing": ["Bun Test"]
}
```

## Architecture

### Project Structure

```
portfolio-payload/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (frontend)/          # Frontend routes
│   │   │   ├── blog/            # Blog pages
│   │   │   ├── contact/         # Contact page
│   │   │   ├── projects/        # Projects showcase
│   │   │   └── user/            # User authentication
│   │   └── (payload)/           # Payload CMS routes
│   │       └── api/             # API endpoints
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   ├── schemas/                 # Payload collections
│   ├── forms/                   # Form schemas
│   └── __tests__/               # Test files
├── public/                      # Static assets
├── payload-types.ts             # Generated types
└── payload.config.ts            # Payload configuration
```

### Core Components

#### Frontend Architecture
- **App Router**: Next.js 15 app directory structure
- **Server Components**: Default rendering for performance
- **Client Components**: Interactive UI elements
- **Streaming**: React 18 Suspense boundaries

#### Backend Architecture
- **Payload CMS**: Headless content management
- **Collections**: Data models for content
- **Hooks**: Lifecycle management
- **Access Control**: Role-based permissions

## Getting Started

### Prerequisites

```bash
# Required software
node >= 18.x
bun >= 1.x (recommended) or npm/yarn
git
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-payload
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration))

5. **Database setup**
   ```bash
   # Generate Payload types
   bun run generate:types
   
   # Generate import map
   bun run generate:importmap
   ```

6. **Start development server**
   ```bash
   bun run dev
   ```

Visit `http://localhost:3000` for the frontend and `http://localhost:3000/admin` for the Payload admin panel.

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
POSTGRES_URL="postgresql://..."

# Payload CMS
PAYLOAD_SECRET="your-secret-key"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/user/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/user/sign-up"

# Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Security
CRON_SECRET="your-cron-secret"

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="..."
```

### Payload Configuration

The main configuration is in `src/payload.config.ts`:

```typescript
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [
    Users, Media, FAQs, Reviews, Projects, 
    RateLimits, Messages, Blog, Page
  ],
  editor: lexicalEditor(),
  db: vercelPostgresAdapter({
    pool: { connectionString: process.env.POSTGRES_URL || "" }
  }),
  // ... other configurations
});
```

## Collections

### Core Collections

#### 1. Users
```typescript
// Authentication and user management
{
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [
    { name: "email", type: "email", required: true },
    { name: "roles", type: "select", options: ["admin", "user"] }
  ]
}
```

#### 2. Blog
```typescript
// Blog posts and articles
{
  slug: "blog",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "content", type: "richText" },
    { name: "tags", type: "array" },
    { name: "image", type: "upload", relationTo: "media" }
  ]
}
```

#### 3. Projects
```typescript
// Portfolio projects
{
  slug: "projects",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "technologies", type: "array" },
    { name: "github", type: "text" },
    { name: "demo", type: "text" },
    { name: "image", type: "upload", relationTo: "media" }
  ]
}
```

#### 4. Messages
```typescript
// Contact form submissions
{
  slug: "messages",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "ip", type: "text" },
    { name: "read", type: "checkbox", defaultValue: false }
  ]
}
```

### Collection Hooks

#### Auto-populate Authors
```typescript
// src/schemas/hooks/populateAuthors.ts
export const populateAuthors: CollectionBeforeChangeHook = async ({ 
  data, req 
}) => {
  if (req.user) {
    return { ...data, authors: [req.user.id] };
  }
  return data;
};
```

#### Slug Generation
```typescript
// src/schemas/hooks/updateSlug.ts
export const updateSlug: CollectionBeforeValidateHook = async ({ 
  data, originalDoc 
}) => {
  if (data.title && (!originalDoc?.slug || data.title !== originalDoc.title)) {
    data.slug = data.title.toLowerCase().replace(/\s+/g, '-');
  }
  return data;
};
```

## API Reference

### Server Actions

#### Email Submission
```typescript
// src/app/(frontend)/contact/_action/submitEmail.ts
export async function submitEmail(formData: FormData): Promise<ActionResult>
```

**Parameters:**
- `name`: string (3-50 characters)
- `email`: valid email address
- `message_content`: string (10-500 characters)
- `ip`: optional string

**Rate Limiting:** 1 submission per hour per IP/email

**Returns:**
- Success: `{ success: true, message: string }`
- Error: `{ success: false, error: string }`

### REST API Endpoints

#### Blog Posts
```http
GET /api/blog
GET /api/blog/:id
POST /api/blog (admin only)
PATCH /api/blog/:id (admin only)
DELETE /api/blog/:id (admin only)
```

#### Projects
```http
GET /api/projects
GET /api/projects/:id
POST /api/projects (admin only)
PATCH /api/projects/:id (admin only)
```

#### Media Upload
```http
POST /api/media
Content-Type: multipart/form-data
```

### GraphQL API

Access GraphQL playground at `/api/graphql-playground`

**Example Queries:**

```graphql
# Get all blog posts
query {
  Blog {
    docs {
      id
      title
      description
      content
      createdAt
      image {
        url
        alt
      }
    }
  }
}

# Get projects with pagination
query {
  Projects(limit: 10, page: 1) {
    docs {
      id
      title
      description
      technologies
      github
      demo
    }
    totalPages
    hasNextPage
  }
}
```

## Testing

### Test Structure

Tests are located in `src/__tests__/` and use Bun's built-in test runner.

```typescript
// Basic test structure
import { test, expect, describe, beforeEach, jest } from "bun:test";

describe("Component Name", () => {
  test("should behave as expected", () => {
    expect(result).toBe(expected);
  });
});
```

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test src/__tests__/example.test.ts

# Run tests with coverage
bun test --coverage
```

### Test Categories

#### 1. Utility Functions
```typescript
describe("utils.ts", () => {
  test("cn should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });
  
  test("formatImage should handle Media objects", () => {
    expect(formatImage({ url: "/test.jpg" })).toBe("/test.jpg");
  });
});
```

#### 2. Form Validation
```typescript
describe("Form Schema", () => {
  test("should validate email format", () => {
    const result = formSchema.safeParse({
      email: "invalid-email"
    });
    expect(result.success).toBe(false);
  });
});
```

#### 3. Server Actions
```typescript
describe("submitEmail", () => {
  test("should enforce rate limiting", async () => {
    // Mock recent submission
    mockPayload.find.mockResolvedValueOnce({
      docs: [{ timestamp: Date.now() - 30 * 60 * 1000 }]
    });
    
    // Test rate limiting logic
    expect(submissionAllowed).toBe(false);
  });
});
```

## Deployment

### Vercel Deployment

1. **Connect Repository**
   - Connect your GitHub repository to Vercel
   - Select the `portfolio-payload` project

2. **Environment Variables**
   ```bash
   # Set in Vercel dashboard
   POSTGRES_URL=postgresql://...
   PAYLOAD_SECRET=your-secret
   NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
   # ... other variables
   ```

3. **Build Configuration**
   ```json
   {
     "buildCommand": "bun run build",
     "outputDirectory": ".next",
     "installCommand": "bun install"
   }
   ```

4. **Database Setup**
   - Create Vercel Postgres database
   - Copy connection string to `POSTGRES_URL`
   - Run migrations on deploy

### Custom Deployment

For other hosting providers:

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Start production server**
   ```bash
   bun run start
   ```

3. **Environment requirements**
   - Node.js 18+ runtime
   - PostgreSQL database
   - File storage solution
   - SMTP email service

## Development Guidelines

### Code Style

#### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Leverage Payload's generated types

```typescript
// Good: Use generated types
import { Blog, Project } from "@/payload-types";

interface BlogCardProps {
  blog: Blog;
  index: number;
}
```

#### React Components
- Use Server Components by default
- Add `"use client"` only when necessary
- Implement proper error boundaries

```typescript
// Server Component (default)
export default async function BlogPage() {
  const blogs = await getBlogPosts();
  return <BlogList blogs={blogs} />;
}

// Client Component
"use client";
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <div onClick={() => setState()}>{state}</div>;
}
```

#### Styling
- Use Tailwind CSS utility classes
- Create reusable component variants
- Follow responsive design principles

```typescript
// Component with proper styling
export function Button({ variant, size, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium",
        "focus-visible:outline-none focus-visible:ring-2",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-10 px-4",
        size === "lg" && "h-11 px-8"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Performance Guidelines

#### Optimization Strategies
- Use React Server Components for data fetching
- Implement proper caching with `unstable_cache`
- Optimize images with Next.js Image component
- Minimize client-side JavaScript

```typescript
// Proper caching implementation
import { unstable_cache as nextCache } from "next/cache";

export const getCachedBlogs = nextCache(
  async () => {
    const { docs } = await payload.find({
      collection: "blog",
      sort: "-createdAt"
    });
    return docs;
  },
  ["blogs"],
  { revalidate: 3600 } // 1 hour
);
```

#### Bundle Analysis
```bash
# Analyze bundle size
ANALYZE=true bun run build
```

### Security Guidelines

#### Authentication
- Use Clerk for user authentication
- Implement proper access controls
- Validate all user inputs

#### Data Validation
```typescript
// Always validate with Zod schemas
const formSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(500)
});

// Server-side validation
const result = formSchema.safeParse(formData);
if (!result.success) {
  throw new Error("Invalid form data");
}
```

#### Rate Limiting
```typescript
// Implement rate limiting for sensitive operations
const rateLimitCheck = await payload.find({
  collection: "rateLimits",
  where: {
    and: [
      { email: { equals: email } },
      { timestamp: { greater_than: oneHourAgo } }
    ]
  }
});

if (rateLimitCheck.docs.length > 0) {
  throw new Error("Rate limit exceeded");
}
```

## Troubleshooting

### Common Issues

#### 1. Build Errors

**Issue**: `Invalid config value exports detected`
```bash
Error: Command "bun run build" exited with 1
```

**Solution**: Check `payload.config.ts` for:
- Only one default export
- No circular imports
- Correct file extension (.ts)

#### 2. Database Connection Issues

**Issue**: `Cannot connect to database`

**Solutions**:
- Verify `POSTGRES_URL` format
- Check database server availability
- Ensure connection string includes SSL settings

#### 3. Authentication Problems

**Issue**: `Clerk authentication not working`

**Solutions**:
- Verify Clerk environment variables
- Check domain configuration in Clerk dashboard
- Ensure sign-in/sign-up URLs match routes

#### 4. Image Upload Failures

**Issue**: `Failed to upload to Vercel Blob`

**Solutions**:
- Verify `BLOB_READ_WRITE_TOKEN`
- Check file size limits (default: 4.5MB)
- Ensure correct content type headers

### Debug Mode

Enable debug logging:

```bash
# Development
DEBUG=payload:* bun run dev

# Production debugging
NODE_ENV=development bun run start
```

### Performance Issues

#### Slow Database Queries
1. Add database indexes
2. Implement proper caching
3. Use database query optimization

#### Large Bundle Sizes
1. Analyze bundle with `ANALYZE=true bun run build`
2. Implement code splitting
3. Remove unused dependencies

### Getting Help

- **Documentation**: [Payload CMS Docs](https://payloadcms.com/docs)
- **Community**: [Payload Discord](https://discord.com/invite/payload)
- **Issues**: [GitHub Issues](https://github.com/payloadcms/payload/issues)

---

## Appendix

### File Conventions

```
Components: PascalCase (BlogCard.tsx)
Hooks: camelCase with 'use' prefix (useSearch.ts)
Utils: camelCase (formatImage.ts)
Types: PascalCase (BlogPost.ts)
Constants: UPPER_SNAKE_CASE (API_ENDPOINTS.ts)
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve issue with component"
git push origin fix/bug-description
```

### VS Code Configuration

Recommended extensions:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Prettier - Code Formatter
- ESLint

Workspace settings (`.vscode/settings.json`):
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```