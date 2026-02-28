# GG Tracker

Personal high-performance life tracking system.

## Setup

1. Install PostgreSQL 17 and ensure it's running locally.
2. Copy `.env.example` to `.env` and fill values (make sure the DATABASE_URL uses Postgres 17).
3. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Structure

- `app/` — Next.js App Router pages
- `components/` — reusable UI components
- `lib/` — utilities and API wrappers
- `prisma/` — schema and migrations
- `app/api/` — route handlers
