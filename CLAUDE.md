# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anantaraa Design Studio is a React-based architecture portfolio website with an admin CMS built using:
- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM (client-side routing with SPA architecture)
- **Backend**: Supabase (PostgreSQL database + authentication + storage)
- **Animations**: Framer Motion for page transitions
- **Smooth Scrolling**: Lenis library
- **Deployment**: Vercel (configured with rewrites for client-side routing)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Architecture

### Application Structure

```
src/
├── pages/              # Route components (Home, Projects, Team, Values, Contact)
│   └── admin/         # Admin CMS pages (Login, Dashboard, ProjectsManager, TeamManager, ValuesManager)
├── components/        # Reusable components (Navigation, Footer, SmoothScroll, ProtectedRoute, etc.)
├── contexts/          # React Context providers (AuthContext for Supabase auth)
├── lib/              # Utilities (supabase client, seed script)
├── data/             # Static data (projects.js - fallback/seed data)
└── assets/           # Images and static assets
```

### Routing Architecture

The app uses client-side routing with React Router DOM v6. Two main route groups:

1. **Public Routes**: `/`, `/projects`, `/projects/:id`, `/values`, `/team`, `/contact`
2. **Admin Routes**: `/admin/login` (public), `/admin/*` (protected with ProtectedRoute wrapper)

Admin routes use nested routing with `AdminLayout` as the parent wrapper and `Outlet` for child routes.

**Important**: Vercel rewrites are configured in `vercel.json` to redirect all non-asset routes to `/index.html` for client-side routing to work correctly.

### Authentication & Authorization

- **AuthContext** (`src/contexts/AuthContext.jsx`): Wraps entire app, manages Supabase session state
- **ProtectedRoute** component: HOC that redirects to `/admin/login` if no session exists
- Admin authentication uses Supabase Auth (email/password)
- Session persists across page reloads via Supabase session management

### Data Flow

**Content is managed through Supabase with three main tables**:
- `projects`: Main portfolio projects with image galleries
- `team`: Team member profiles
- `values`: Company values/principles with display order

**Image Storage**: Images are uploaded to Supabase Storage buckets and URLs stored in database. The `ImageUpload` component handles file uploads and returns public URLs.

**Static Fallback**: `src/data/projects.js` contains fallback/seed data. The `seed.js` script can populate Supabase tables from this static data.

### Key Technical Patterns

**Page Transitions**: Every route is wrapped in Framer Motion's `AnimatePresence` with `mode="wait"`. Individual pages use the `PageTransition` component for consistent entrance/exit animations.

**Smooth Scrolling**: The entire app is wrapped in `SmoothScroll` component using Lenis library with custom easing configuration.

**Admin CRUD Pattern**: Admin manager pages (`ProjectsManager`, `TeamManager`, `ValuesManager`) follow a consistent pattern:
1. Fetch data from Supabase on mount
2. Inline editing with local state management
3. Image uploads via `ImageUpload` component
4. Direct Supabase queries for create/update/delete operations

**Project Gallery Structure**: Projects have 7 image slots:
- `image_url`: Main project image
- `gallery_vertical`: Left vertical image
- `gallery_horizontal_1`: Right top horizontal
- `gallery_horizontal_2`: Right bottom horizontal
- `gallery_grid_1`, `gallery_grid_2`, `gallery_grid_3`: Additional grid images

## Environment Setup

Required environment variables (create `.env` from `.env.example`):

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

These are accessed via `import.meta.env.VITE_*` (Vite's environment variable pattern).

## Supabase Database Schema

When working with database queries, the expected table structure:

**projects**: `id`, `title`, `type`, `location`, `year`, `role`, `description`, `challenge`, `solution`, `image_url`, `gallery_vertical`, `gallery_horizontal_1`, `gallery_horizontal_2`, `gallery_grid_1`, `gallery_grid_2`, `gallery_grid_3`, `stats` (JSONB), `created_at`

**team**: `id`, `name`, `role`, `bio`, `image_url`, `created_at`

**values**: `id`, `title`, `description`, `display_order`, `created_at`

## Code Style Notes

- JSX files use `.jsx` extension
- No TypeScript (pure JavaScript)
- ESLint configured with React hooks rules
- Unused variables starting with uppercase or underscore are ignored by linter
- Component file names are PascalCase
- Utility/lib files are camelCase
