# Connecting Supabase

The app supports **two modes**:

- **Mock mode** (default) — no env vars, in-memory demo data, auto-logged-in admin
- **Supabase mode** — real auth, PostgreSQL, persistent data

Mode is detected automatically: if `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (and `USE_MOCK` is not `true`), Supabase is used.

## 1. Create Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy **Project URL** and **anon key**

## 2. Run database migration

In Supabase **SQL Editor**, run:

```
supabase/migrations/20260101000000_initial_schema.sql
supabase/migrations/20260102000000_sync_vote_counts.sql
supabase/migrations/20260103000000_oauth_profile_handling.sql
```

The second migration adds vote-count triggers so user votes persist correctly.

Then seed categories and merchants (no auth users required):

```
supabase/seed_categories_merchants.sql
```

Import your live VyhodaDeal offers (Casio watches, AliExpress deals 1–7):

```
supabase/seed_vyhodadeal_deals.sql
```

Replace `YOUR_USER_UUID` in that file with your profile id from `SELECT id, username FROM profiles;` after registering.

Optional full demo data (requires auth users with matching UUIDs):

```
supabase/seed.sql
```

## 3. Environment variables

Create `.env.local`:

```env
USE_MOCK=false
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Restart the dev server after changing env vars.

## 4. Install dependencies

```powershell
npm install
```

Supabase packages (`@supabase/supabase-js`, `@supabase/ssr`) are already in `package.json`.

## 5. Promote admin user

After registering your account:

```sql
UPDATE profiles SET role = 'admin' WHERE username = 'your_username';
```

## 6. Google sign-in (optional)

The app already has the **«Продовжити з Google»** button and `/auth/callback` route. You only need dashboard configuration:

### A. Google Cloud Console

1. Open [Google Cloud Console](https://console.cloud.google.com/) → select or create a project.
2. **APIs & Services → OAuth consent screen** — configure app name, support email, add `vyhodadeal.com` under authorized domains if prompted.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** → type **Web application**.
4. **Authorized JavaScript origins:**
   - `https://vyhodadeal.com`
   - `http://localhost:3000` (for local testing)
5. **Authorized redirect URIs** — copy the exact callback URL from Supabase (step B.2), e.g.  
   `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
6. Save and copy **Client ID** + **Client Secret**.

### B. Supabase Dashboard

1. **Authentication → Providers → Google** — enable, paste Client ID + Client Secret, save.
2. Note the **Callback URL** shown on that page (for Google step A.5).
3. **Authentication → URL Configuration:**
   - **Site URL:** `https://vyhodadeal.com`
   - **Redirect URLs** (add all):
     - `https://vyhodadeal.com/auth/callback`
     - `http://localhost:3000/auth/callback`
     - `https://dealua.vercel.app/auth/callback` (optional preview URL)
4. **SQL Editor** — run if not applied yet:

```
supabase/migrations/20260103000000_oauth_profile_handling.sql
```

This creates profiles with username + avatar from Google name/picture.

### C. Vercel

Ensure these env vars exist (Production):

| Variable | Value |
|----------|-------|
| `USE_MOCK` | `false` |
| `NEXT_PUBLIC_SUPABASE_URL` | your project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://vyhodadeal.com` |

Redeploy after changes.

### D. Test

1. Open [vyhodadeal.com/login](https://vyhodadeal.com/login)
2. Click **«Продовжити з Google»**
3. After Google consent you should land on the homepage, logged in
4. Check profile: `SELECT id, username, avatar_url FROM profiles ORDER BY created_at DESC LIMIT 5;`

## 7. Telegram sign-in (optional)

Telegram uses the [Login Widget](https://core.telegram.org/widgets/login) — not a built-in Supabase provider.

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram.
2. Run `/setdomain` in BotFather and set your domain to `vyhodadeal.com` (and `localhost` for local testing if supported).
3. Add env vars locally and in Vercel:

```env
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=YourBotName
TELEGRAM_BOT_TOKEN=123456:ABC...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

`SUPABASE_SERVICE_ROLE_KEY` is in Supabase **Project Settings → API** (keep secret — server only).

Optional: `TELEGRAM_AUTH_SECRET` — separate HMAC secret for Telegram account passwords (defaults to the service role key).

4. Ensure the OAuth profile migration from step 6 is applied (creates profiles for new Telegram users).

Users will see the official **Log in with Telegram** button on login and register pages.

## 8. What switches automatically

| Feature | Mock | Supabase |
|---------|------|----------|
| Deals feed | In-memory | PostgreSQL |
| Login / Register | Placeholder | Real auth forms |
| Voting / Comments | In-memory | Database |
| Admin moderation | In-memory | Database |
| Click tracking | In-memory | `click_events` table |
| Yellow demo banner | Shown | Hidden |

No code changes needed — just env vars + migration.

## 9. Deploy

Add the same env vars in Vercel project settings. See [DEPLOY.md](DEPLOY.md).
