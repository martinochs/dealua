# Deploy DealUA to Vercel

## 1. Push to GitHub

Git is already initialized with an initial commit on branch `main`.

Create a new repo on [GitHub](https://github.com/new) (no README), then:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/dealua.git
git branch -M main
git push -u origin main
```

## 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. **Add New Project** → import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**

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
