@echo off
cd /d c:\anasflow-complete\frontend-next
start npm run dev
cd /d c:\anasflow-complete\backend
start python app/main.py
