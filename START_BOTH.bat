@echo off
echo Starting AnasFlow...
start "Backend" cmd /k "cd /d c:\anasflow-complete\backend && python app/main.py"
timeout /t 3
start "Frontend" cmd /k "cd /d c:\anasflow-complete\frontend-next && npm run dev"
echo Both servers starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
pause
