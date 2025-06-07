# Admin Panel Documentation

## Overview
The admin panel provides a comprehensive interface for managing the website's content. It includes sections for managing portfolio projects, blog posts, services, and team members. It also includes an AI assistant feature (coming soon) to help generate content.

## Pages

- **Dashboard** (`/admin/page.tsx`): Overview of the admin panel
- **Portfolio** (`/admin/portfolio/page.tsx`): Manage portfolio projects
- **Blog** (`/admin/blog/page.tsx`): Manage blog posts
- **Services** (`/admin/services/page.tsx`): Manage service offerings
- **Team** (`/admin/team/page.tsx`): Manage team members
- **AI Assistant** (`/admin/ai-assistant/page.tsx`): Content generation assistant (coming soon)

## Features

### Content Management
Each section (Portfolio, Blog, Services, Team) includes:
- List view with search and filter options
- Create new items
- Edit existing items
- Delete items
- Preview changes before publishing

### AI Assistant
The AI Assistant feature is currently under development. When implemented, it will help generate content for various sections of the website.

## API Routes
- `/api/admin/[section]/route.ts`: API routes for each section (portfolio, blog, services, team)
- `/api/admin/upload/route.ts`: File upload handling
- `/api/admin/ai/route.ts`: AI assistant route (coming soon)

## Components
The admin panel uses several reusable components located in `src/components/admin/`:
- `DataTable.tsx`: Reusable table component with sorting and filtering
- `AiAssistant.tsx`: AI content generation component (under development)
- `Editor.tsx`: Rich text editor component
- `ImageUpload.tsx`: Image upload component

## Authentication
The admin panel is protected by authentication. Only authorized users can access the admin features.

## Future Development
- Implementation of AI Assistant functionality
- Enhanced analytics dashboard
- Bulk operations for content management
- Advanced content scheduling 