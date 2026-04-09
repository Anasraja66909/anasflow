@echo off
REM AnasFlow Backend Startup Script for Windows

echo Starting AnasFlow Backend...
echo.
echo Backend will run on: http://localhost:8000
echo API Docs will be available at: http://localhost:8000/docs
echo.

cd /d "%~dp0"

REM Check if .venv exists
if not exist ".venv" (
    echo Creating Python virtual environment...
    python -m venv .venv
)

REM Activate virtual environment
call .venv\Scripts\activate.bat

REM Install requirements if needed
pip install -q -r requirements.txt

REM Start the backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

pause
