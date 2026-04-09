@echo off
REM AnasFlow Frontend Startup Script for Windows

echo Starting AnasFlow Frontend...
echo.
echo Frontend will run on: http://localhost:3000
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start the frontend
npm run dev

pause
