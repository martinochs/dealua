@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0push-github.ps1" %*
pause
