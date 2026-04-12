@echo off
cd /d "%~dp0frontend-next"
start npm run dev
cd /d "%~dp0backend"
start python app/main.py
