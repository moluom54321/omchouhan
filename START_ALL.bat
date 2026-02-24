@echo off
echo Starting Music School Delhi Application (Dual Port Mode)...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.

REM Check if MongoDB is running
echo Checking MongoDB Service...
sc query MongoDB | find "RUNNING" >nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB is not running. Attempting to start...
    net start MongoDB >nul 2>&1
    if %errorlevel% neq 0 (
        echo [WARNING] Could not start MongoDB automatically.
        echo Please ensure MongoDB is running for the backend to work.
    )
)

echo.
echo Launching Servers...
cd /d "backend"
start "Music School - Dual Servers" cmd /k "npm run both"

echo.
echo Opening browser to frontend (Port 3000)...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo Both servers are starting up!
echo Press any key to exit this script window (servers will keep running in their own window).
pause >nul
