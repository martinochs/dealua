# Push to GitHub without gh CLI — create repo at github.com/new first (name: dealua, no README)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$env:Path = "C:\Program Files\Git\bin;" + $env:Path

$git = "git"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  $git = "C:\Program Files\Git\bin\git.exe"
}

$user = if ($args.Count -gt 0) { $args[0] } else { "martinochs" }
$repo = if ($args.Count -gt 1) { $args[1] } else { "dealua" }
$url = "https://github.com/$user/$repo.git"

Write-Host "=== Push to github.com/$user/$repo ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Before running: create an empty repo at https://github.com/new" -ForegroundColor Yellow
Write-Host "  Name: $repo  |  Do NOT add README, .gitignore, or license" -ForegroundColor Gray
Write-Host ""

$remotes = & $git remote 2>$null
if ($remotes -notcontains "origin") {
  Write-Host "Adding remote origin..." -ForegroundColor Yellow
  & $git remote add origin $url
} else {
  Write-Host "Updating remote origin..." -ForegroundColor Yellow
  & $git remote set-url origin $url
}

Write-Host "Pushing main..." -ForegroundColor Yellow
& $git push -u origin main

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Done! https://github.com/$user/$repo" -ForegroundColor Green
  Write-Host "Next: Vercel -> dealua -> Settings -> Git -> connect this repo" -ForegroundColor Cyan
}
