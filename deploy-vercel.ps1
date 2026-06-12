# Deploy DealUA to Vercel from CLI — run from project folder
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function Find-Vercel {
  if (Get-Command vercel -ErrorAction SilentlyContinue) { return "vercel" }
  $npmVercel = "$env:APPDATA\npm\vercel.cmd"
  if (Test-Path $npmVercel) { return $npmVercel }
  return $null
}

$vercel = Find-Vercel
if (-not $vercel) {
  Write-Host "Vercel CLI not found. Install with:" -ForegroundColor Red
  Write-Host "  npm install -g vercel" -ForegroundColor White
  exit 1
}

Write-Host "=== DealUA → Vercel ===" -ForegroundColor Cyan

$whoami = & $vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Not logged in to Vercel. Run this first (opens browser):" -ForegroundColor Yellow
  Write-Host "  vercel login" -ForegroundColor White
  exit 1
}

Write-Host "Logged in as: $whoami" -ForegroundColor Gray

$prod = $args -contains "--prod"
if ($prod) {
  Write-Host "Deploying to production..." -ForegroundColor Yellow
  & $vercel --prod
} else {
  Write-Host "Deploying preview (add --prod for production URL)..." -ForegroundColor Yellow
  & $vercel
}

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Deploy complete. Mock mode works without env vars." -ForegroundColor Green
  Write-Host "For Supabase: add env vars in Vercel dashboard, then redeploy." -ForegroundColor Gray
}
