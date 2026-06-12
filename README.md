# DealUA — Ukraine Deals Platform

A MyDealz-style deal-sharing platform for Ukraine. **Ready to run locally** with mock data, **ready for production** with Supabase.

**Workspace:** `C:\Users\marti\OneDrive\OneDrive - Steuerplus\DATA\03 NWB Steuer geschäftlich\Ochs, Martin\Mydealz`  
**Mirror copy:** `C:\Users\marti\Projects\Mydealz`

## Status: Complete

| Component | Status |
|-----------|--------|
| Mock MVP (20 deals, voting, comments, admin) | Done |
| Search, pagination, hot deals strip | Done |
| Ukrainian UI, mobile-first layout | Done |
| Supabase dual-mode (auto-switch via env) | Done |
| Auth (login/register) + route protection | Done |
| SEO (sitemap, robots, manifest, OpenGraph) | Done |
| SQL migrations + seed files | Done |
| Build + lint | Passes |
| Deploy docs | [DEPLOY.md](DEPLOY.md) |
| **Git init / Vercel deploy** | Needs Git installed on your PC |
| **Live Supabase DB** | Needs your Supabase project + env vars |

## Quick start

```powershell
cd "C:\Users\marti\OneDrive\OneDrive - Steuerplus\DATA\03 NWB Steuer geschäftlich\Ochs, Martin\Mydealz"
npm install
npm run dev
```

Or double-click **`start-dev.bat`**.

**Full setup check** (install deps, build, init git if available):

```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
```

Open **http://localhost:3000**

If `npm` is not found:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Features

- Homepage with hero, hot deals strip, categories, hot/new/top feeds
- Load-more pagination on homepage, `/deals`, and category pages
- Search bar → `/deals?q=...`
- Deal detail with hot/cold voting and comments
- Submit deals + admin moderation queue
- Admin stats + affiliate click analytics
- Profile pages with pending deals
- About, rules, contact pages
- Affiliate link tracking via `/go/[dealId]`

## Demo mode (default)

No env vars required.

- Yellow banner indicates mock mode
- Auto-logged in as **admin**
- Votes/comments persist until dev server restart

## Production mode (Supabase)

See [SUPABASE.md](SUPABASE.md). Summary:

1. Create Supabase project
2. Run `supabase/migrations/20260101000000_initial_schema.sql`
3. Run `supabase/seed_categories_merchants.sql`
4. Create `.env.local`:

```env
USE_MOCK=false
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Register at `/register`, then promote to admin:

```sql
UPDATE profiles SET role = 'admin' WHERE username = 'your_username';
```

## Pages

| URL | Description |
|-----|-------------|
| `/` | Homepage |
| `/deals` | All deals + search |
| `/deals?q=samsung` | Search results |
| `/categories` | Category overview |
| `/category/elektronika` | Category feed |
| `/deal/deal-19` | Deal detail (PS5 example) |
| `/submit` | Submit deal |
| `/admin` | Moderation + analytics |
| `/profile/admin` | User profile |
| `/login`, `/register` | Auth (Supabase mode) |
| `/about`, `/rules`, `/contact` | Info pages |

## Deploy

See [DEPLOY.md](DEPLOY.md) — requires [Git for Windows](https://git-scm.com/download/win), GitHub, and Vercel.

## Project structure

```
app/                    Next.js App Router pages
components/             UI, deals, layout, admin, auth
lib/
  mock/                 Demo data + in-memory store
  supabase/             Supabase clients, queries, middleware
  queries/              Data layer (routes mock ↔ Supabase)
  actions/              Server actions
  auth/                 Session helpers
  i18n/uk.ts            Ukrainian strings
supabase/
  migrations/           PostgreSQL schema + RLS
  seed*.sql             Demo seed data
middleware.ts           Session refresh + route guards
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint check |
