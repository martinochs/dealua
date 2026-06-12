# DealUA setup helper — run in PowerShell from the project folder
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== DealUA Setup ===" -ForegroundColor Cyan

function Find-Git {
  $paths = @("git", "C:\Program Files\Git\bin\git.exe", "C:\Program Files (x86)\Git\bin\git.exe")
  foreach ($p in $paths) {
    if (Get-Command $p -ErrorAction SilentlyContinue) { return $p }
    if (Test-Path $p) { return $p }
  }
  return $null
}

function Find-Npm {
  if (Get-Command npm -ErrorAction SilentlyContinue) { return "npm" }
  if (Test-Path "C:\Program Files\nodejs\npm.cmd") { return "C:\Program Files\nodejs\npm.cmd" }
  return $null
}

$npm = Find-Npm
if (-not $npm) {
  Write-Host "Node.js/npm not found. Install from https://nodejs.org/" -ForegroundColor Red
  exit 1
}

Write-Host "Installing dependencies..." -ForegroundColor Yellow
& $npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Running production build..." -ForegroundColor Yellow
& $npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Build OK." -ForegroundColor Green

$git = Find-Git
if (-not $git) {
  Write-Host ""
  Write-Host "Git not installed. Install it to deploy:" -ForegroundColor Yellow
  Write-Host "  winget install Git.Git" -ForegroundColor White
  Write-Host "  or https://git-scm.com/download/win" -ForegroundColor White
  Write-Host ""
  Write-Host "Then run:" -ForegroundColor Yellow
  Write-Host "  git init" -ForegroundColor White
  Write-Host "  git add ." -ForegroundColor White
  Write-Host '  git commit -m "DealUA MVP"' -ForegroundColor White
} elseif (-not (Test-Path ".git")) {
  Write-Host "Initializing git repository..." -ForegroundColor Yellow
  & $git init
  Write-Host "Git initialized. Next:" -ForegroundColor Green
  Write-Host "  git add ." -ForegroundColor White
  Write-Host '  git commit -m "DealUA MVP"' -ForegroundColor White
  Write-Host "  See DEPLOY.md for GitHub + Vercel steps" -ForegroundColor White
} else {
  Write-Host "Git repo already exists." -ForegroundColor Green
}

Write-Host ""
Write-Host "Start dev server:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host "  or double-click start-dev.bat" -ForegroundColor White
Write-Host ""
Write-Host "Open http://localhost:3000" -ForegroundColor Cyan
