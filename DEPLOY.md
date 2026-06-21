# Deploy DealUA to Vercel

## Current status

| Step | Status |
|------|--------|
| **Live site** | [https://dealua.vercel.app](https://dealua.vercel.app) (mock mode) |
| **GitHub** | [github.com/martinochs/dealua](https://github.com/martinochs/dealua) — pushed |
| **Vercel** | Project `dealua`, auto-deploy from GitHub |
| **Git ↔ Vercel** | Connected — pushes to `main` deploy automatically |

## 1. Push to GitHub

Git is already initialized on branch `main` with all commits.

**Tip:** If `git` is not recognized, restart Cursor after installing Git, or use the full path:
`C:\Program Files\Git\bin\git.exe`

### Option A — GitHub CLI (recommended)

GitHub CLI is installed. Log in once, then push:

```powershell
cd "C:\Users\marti\OneDrive\OneDrive - Steuerplus\DATA\03 NWB Steuer geschäftlich\Ochs, Martin\Mydealz"

# One-time login (opens browser)
gh auth login

# Create repo + push (default name: dealua, private)
powershell -ExecutionPolicy Bypass -File push-github.ps1

# Or public repo with custom name:
powershell -ExecutionPolicy Bypass -File push-github.ps1 mydealz-ua public
```

### Option B — Manual (no gh CLI)

1. Create an empty repo at [github.com/new](https://github.com/new) named `dealua` (no README)
2. Run:

```powershell
powershell -ExecutionPolicy Bypass -File push-git-manual.ps1
```

Or step by step:

```powershell
git remote add origin https://github.com/martinochs/dealua.git
git push -u origin main
```

Git will open a browser to sign in if needed.

## 2. Deploy on Vercel

### Option A — Import from GitHub (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. **Add New Project** → import **`martinochs/dealua`** from GitHub
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**

### Option B — Deploy from CLI (no GitHub required)

Vercel CLI is installed. Log in once, then deploy:

```powershell
cd "C:\Users\marti\OneDrive\OneDrive - Steuerplus\DATA\03 NWB Steuer geschäftlich\Ochs, Martin\Mydealz"

# One-time login (opens browser)
vercel login

# Preview deploy
powershell -ExecutionPolicy Bypass -File deploy-vercel.ps1

# Production URL
powershell -ExecutionPolicy Bypass -File deploy-vercel.ps1 --prod
```

### Mock mode (default)

No environment variables needed. Site runs with in-memory demo data.

### Supabase mode (production)

Add these in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `USE_MOCK` | `false` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | (optional) Telegram bot username without `@` |
| `TELEGRAM_BOT_TOKEN` | (optional) From [@BotFather](https://t.me/BotFather) — server only |
| `SUPABASE_SERVICE_ROLE_KEY` | (optional) Required for Telegram sign-in — server only |

Redeploy after adding env vars.

## 3. Supabase setup (for production)

1. Create project at [supabase.com](https://supabase.com)
2. Run migration: `supabase/migrations/20260101000000_initial_schema.sql`
3. Run seed: `supabase/seed_categories_merchants.sql` (categories + merchants)
4. Register via `/register`, then promote to admin:

```sql
UPDATE profiles SET role = 'admin' WHERE username = 'your_username';
```

5. Optional full demo data: `supabase/seed.sql` (requires matching auth user IDs)

See [SUPABASE.md](SUPABASE.md) for details.

## 4. Custom domain (optional)

In Vercel project settings → **Domains**, add your domain.

Update `NEXT_PUBLIC_SITE_URL` to your production URL for SEO/sitemap.
