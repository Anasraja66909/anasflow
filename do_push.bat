@echo off
cd /d "%~dp0"
git add -A
git commit -m "feat: full platform update - dashboard billing analytics KPI cards AI suggestions connection modal backend tests"
git push origin main
echo.
echo Done! All changes pushed to GitHub.
pause
