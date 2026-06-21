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

1. In [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → **Create OAuth client ID** (Web application).
2. Add **Authorized redirect URI**: your Supabase callback URL from **Authentication → Providers → Google** (looks like `https://xxxxx.supabase.co/auth/v1/callback`).
3. In Supabase **Authentication → Providers → Google**: enable Google and paste Client ID + Client Secret.
4. In Supabase **Authentication → URL Configuration**, set:
   - **Site URL**: `https://vyhodadeal.com` (or your Vercel URL)
   - **Redirect URLs**: `https://vyhodadeal.com/auth/callback` and `http://localhost:3000/auth/callback`
5. Run the OAuth profile migration in SQL Editor:

```
supabase/migrations/20260103000000_oauth_profile_handling.sql
```

Users can then click **«Продовжити з Google»** on login and register pages.

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
