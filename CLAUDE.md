# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GeoCapture is a phone location tracking web application built with React (client) and Express (server). The app allows users to search for phone numbers and track their location. Content is primarily in Portuguese (Brazilian).

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server (server only)
npm run dev:client   # Start Vite dev server on port 3000 (client only)
```

The application runs on port 5000 in development (configurable via `PORT` env variable). Both client and server must be running for full functionality.

### Building
```bash
npm run build        # Build both client and server for production
```

The build process:
- Uses Vite to build the React client to `dist/public`
- Uses esbuild to bundle the Express server to `dist/index.cjs`
- Server build selectively bundles dependencies (see `script/build.ts` allowlist)

### Starting Production Build
```bash
npm start            # Run production build (NODE_ENV=production)
```

### Type Checking
```bash
npm run check        # Run TypeScript type checking without emitting files
```

### Database
```bash
npm run db:push      # Push Drizzle schema changes to PostgreSQL database
```

## Architecture

### Monorepo Structure

The project uses a monorepo structure with three main directories:

- **`client/`** - React frontend (Vite + React 19)
- **`server/`** - Express backend (Node.js)
- **`shared/`** - Shared code between client and server (schemas, types)

### Path Aliases

TypeScript and Vite are configured with these path aliases:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

### Client Architecture

**Router**: Uses Wouter for client-side routing (not React Router).

**Pages** (in `client/src/pages/`):
- `home.tsx` - Landing page with phone input form and features
- `searching.tsx` - Search/loading state
- `result.tsx` - Display location results
- `unlock.tsx` - Unlock flow
- `not-found.tsx` - 404 page

**State Management**:
- React Query (`@tanstack/react-query`) for server state
- React hooks (useState, useCallback) for local state

**UI Components**:
- Uses Radix UI primitives extensively
- Custom UI components in `client/src/components/ui/`
- Tailwind CSS for styling (v4)
- Custom components: `HeroSection.tsx`, `PhoneInput.tsx`

**Phone Number Handling**:
- Uses `libphonenumber-js` for parsing and validation
- `country-flag-icons/react/3x2` for flag components
- Phone input supports country selection and real-time formatting

### Server Architecture

**Entry Point**: `server/index.ts`
- Creates Express app and HTTP server
- Registers routes via `registerRoutes()`
- Serves static files in production
- Runs Vite dev server in development

**Key Server Files**:
- `server/routes.ts` - API route registration (currently minimal)
- `server/storage.ts` - Data access layer interface
- `server/static.ts` - Static file serving for production
- `server/vite.ts` - Vite dev server setup

**Storage Layer**:
- Defined via `IStorage` interface in `server/storage.ts`
- Current implementation: `MemStorage` (in-memory store)
- Can be extended with database-backed implementations
- CRUD methods: `getUser()`, `getUserByUsername()`, `createUser()`

**Database**:
- PostgreSQL via Neon (`@neondatabase/serverless`)
- Drizzle ORM for schema and queries
- Schema defined in `shared/schema.ts`
- Migrations in `./migrations/` directory
- Requires `DATABASE_URL` environment variable

### Shared Code

**Schema** (`shared/schema.ts`):
- Drizzle schema definitions (e.g., `users` table)
- Zod validation schemas (e.g., `insertUserSchema`)
- Type exports for use across client and server

## Key Dependencies

**Frontend**:
- React 19 + React DOM 19
- Wouter (routing)
- Tanstack React Query (data fetching)
- Radix UI (component primitives)
- Tailwind CSS v4 + tailwindcss-animate
- Framer Motion (animations)
- libphonenumber-js (phone validation)
- React Hook Form + Zod (form handling)

**Backend**:
- Express (web server)
- Drizzle ORM + Drizzle Zod
- @neondatabase/serverless (PostgreSQL)
- Passport + Passport Local (authentication scaffolding)
- ws (WebSocket support)

**Build Tools**:
- Vite 7 (bundler)
- esbuild (server bundling)
- TypeScript 5.6
- tsx (TypeScript execution)

## Environment Configuration

The app is configured to run on Replit (see `.replit` file):
- Default port: 5000
- PostgreSQL 16 module enabled
- Deployment target: static site

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (defaults to 3000, overridden to 5000 in .replit)

## Important Notes

**Port Configuration**:
- Server must run on the port specified by `PORT` env variable
- Other ports are firewalled (per `server/index.ts` comments)
- This port serves both API and client

**Development vs Production**:
- Development: Vite dev server proxies requests
- Production: Express serves static files from `dist/public`

**Request Logging**:
- Custom middleware logs all `/api` requests with timing
- Format: `METHOD PATH STATUS in XXms :: {response}`

**Type Safety**:
- Strict TypeScript configuration
- Shared types between client and server via `@shared`
- No emit - types checked but not compiled

**Current State**:
- Routes are largely unimplemented (`server/routes.ts` is a stub)
- Storage layer uses in-memory implementation
- Authentication setup (Passport) is present but not wired up
- Focus is on the frontend phone locator UI