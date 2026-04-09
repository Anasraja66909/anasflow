@echo off
SET PATH=C:\Users\ARSLAN\AppData\Local\Programs\Python\Python313\;C:\Users\ARSLAN\AppData\Local\Programs\Python\Python313\Scripts\;C:\Program Files\nodejs\;%PATH%
REM AnasFlow Complete Application Startup Script
REM This script starts both backend and frontend

echo.
echo =============================================
echo    AnasFlow - Unified Automation Dashboard
echo =============================================
echo.
echo Setting up and starting the application...
echo.

REM Get the directory where this script is located
cd /d "%~dp0"

REM Check if we're in the right directory
if not exist "backend" (
    echo Error: backend folder not found!
    echo Please run this script from the anasflow-complete directory.
    pause
    exit /b 1
)

if not exist "frontend-next" (
    echo Error: frontend-next folder not found!
    echo Please run this script from the anasflow-complete directory.
    pause
    exit /b 1
)

echo.
echo =============================================
echo Start the Backend Server
echo =============================================
echo Click "Allow" if Windows Firewall prompts you
echo.
start "AnasFlow Backend" cmd /k "cd backend && call .venv\Scripts\activate.bat && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak

echo.
echo =============================================
echo Start the Frontend Server
echo =============================================
echo.
start "AnasFlow Frontend" cmd /k "cd frontend-next && npm run dev"

echo.
echo =============================================
echo AnasFlow is Starting!
echo =============================================
echo.
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo Frontend: http://localhost:3000
echo.
echo Opening frontend in browser...
timeout /t 3 /nobreak

REM Try to open in default browser
start http://localhost:3000

echo.
echo Both servers are running!
echo To stop them, close the terminal windows.
echo.
pause
