# Create GitHub repo and push DealUA — run from project folder
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Git/gh often missing from PATH until Cursor is restarted after install
$env:Path = "C:\Program Files\Git\bin;C:\Program Files\GitHub CLI;" + $env:Path

function Find-Gh {
  $paths = @("gh", "C:\Program Files\GitHub CLI\gh.exe")
  foreach ($p in $paths) {
    if (Get-Command $p -ErrorAction SilentlyContinue) { return $p }
    if (Test-Path $p) { return $p }
  }
  return $null
}

function Find-Git {
  $paths = @("git", "C:\Program Files\Git\bin\git.exe")
  foreach ($p in $paths) {
    if (Get-Command $p -ErrorAction SilentlyContinue) { return $p }
    if (Test-Path $p) { return $p }
  }
  return $null
}

$gh = Find-Gh
$git = Find-Git

if (-not $git) {
  Write-Host "Git not found. Install from https://git-scm.com/download/win" -ForegroundColor Red
  exit 1
}

if (-not $gh) {
  Write-Host "GitHub CLI not found. Install with: winget install GitHub.cli" -ForegroundColor Red
  exit 1
}

Write-Host "=== DealUA → GitHub ===" -ForegroundColor Cyan

$authOk = $false
try {
  $null = & $gh auth status 2>$null
  if ($LASTEXITCODE -eq 0) { $authOk = $true }
} catch {}

if (-not $authOk) {
  Write-Host ""
  Write-Host "Not logged in to GitHub. Run this first (opens browser):" -ForegroundColor Yellow
  Write-Host "  gh auth login" -ForegroundColor White
  Write-Host ""
  Write-Host "Choose: GitHub.com → HTTPS → Login with browser" -ForegroundColor Gray
  exit 1
}

$repoName = if ($args.Count -gt 0) { $args[0] } else { "dealua" }
$visibility = if ($args.Count -gt 1) { $args[1] } else { "private" }
$visFlag = if ($visibility -eq "public") { "--public" } else { "--private" }

Write-Host "Creating repo: $repoName ($visibility)..." -ForegroundColor Yellow
& $gh repo create $repoName --source=. --remote=origin --push $visFlag
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "If repo already exists, add remote manually:" -ForegroundColor Yellow
  Write-Host "  gh repo create $repoName $visFlag" -ForegroundColor White
  Write-Host "  git remote add origin https://github.com/martinochs/$repoName.git" -ForegroundColor White
  Write-Host "  git push -u origin main" -ForegroundColor White
  exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Done! Repo pushed to GitHub." -ForegroundColor Green
Write-Host "Next: connect GitHub in Vercel settings (see DEPLOY.md)" -ForegroundColor Cyan
& $gh repo view --web 2>$null
