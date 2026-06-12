@echo off
cd /d "%~dp0"
echo Starting DealUA at http://localhost:3000
echo Press Ctrl+C to stop.
echo.

where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  npm run dev
) else (
  "C:\Program Files\nodejs\npm.cmd" run dev
)
