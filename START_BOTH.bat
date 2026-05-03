@echo off
echo ==========================================
echo Starting AnasFlow Local Environment...
echo ==========================================

REM Start Backend
echo Launching Backend...
start "AnasFlow Backend" cmd /k "cd /d "%~dp0backend" && call run_backend.bat"

REM Wait for backend to initialize
timeout /t 5

REM Start Frontend
echo Launching Frontend...
start "AnasFlow Frontend" cmd /k "cd /d "%~dp0frontend-next" && npm run dev"

echo.
echo ==========================================
echo AnasFlow is starting!
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo ==========================================
echo.
pause
