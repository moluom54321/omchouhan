@echo off
echo ============================================================
echo   MUSIC SCHOOL DELHI - ONE-CLICK AUTO FIX & START
echo ============================================================
echo.
echo 1. Clearing any blocked ports (5000 and 3000)...
cd backend
call npx kill-port 3000 5000 >nul 2>&1
echo 2. Checking Database Connection...
node diagnose_db.js
echo.
echo 3. Starting Server and Dashboard...
echo Keep this window open!
npm run both
pause
