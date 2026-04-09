@echo off
cd /d c:\anasflow-master

echo Initializing git...
git init

echo Configuring git user...
git config user.name "AnasFlow"
git config user.email "support@anasflow.app"

echo Adding all files...
git add .

echo Creating commit...
git commit -m "AnasFlow - initial commit"

echo Adding remote...
git remote remove origin 2>nul
git remote add origin https://github.com/hanzalaraja93-ctrl/anasflow.git

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main --force

echo.
echo DONE! Check GitHub: https://github.com/hanzalaraja93-ctrl/anasflow
pause
