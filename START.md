# DealUA — Quick start

## 1. Open in Cursor

**File → Open Folder** → this project folder

## 2. Start the site

**Option A** — double-click `start-dev.bat`

**Option B** — terminal:

```powershell
npm install    # first time only
npm run dev
```

If `npm` is not found:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## 3. Open in browser

http://localhost:3000

## Useful pages

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| All deals | http://localhost:3000/deals |
| Search | http://localhost:3000/deals?q=samsung |
| Categories | http://localhost:3000/categories |
| Admin | http://localhost:3000/admin |
| Submit deal | http://localhost:3000/submit |

## Stop the server

Press `Ctrl+C` in the terminal.

## Go live

1. **GitHub:** `gh auth login` then `powershell -ExecutionPolicy Bypass -File push-github.ps1`
2. **Vercel:** import repo at [vercel.com](https://vercel.com) — or `vercel login` then `deploy-vercel.ps1 --prod`
3. **Supabase (optional):** [SUPABASE.md](SUPABASE.md)
