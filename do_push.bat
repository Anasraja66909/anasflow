@echo off
cd /d "%~dp0"
git add -A
git commit -m "fix: ConnectionModal layout - proper max-h, overflow-y-auto, width clamp for all screen sizes"
git push origin main
echo.
echo Done! All changes pushed to GitHub.
pause
