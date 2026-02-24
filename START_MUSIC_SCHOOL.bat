@echo off
echo Starting Music School Delhi Backend Server...
echo.

REM Check if MongoDB is running
echo Checking MongoDB Service...
sc query MongoDB | find "RUNNING" >nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB is not running. Attempting to start...
    net start MongoDB >nul 2>&1
    if %errorlevel% neq 0 (
        echo [WARNING] Could not start MongoDB automatically.
        echo Please start MongoDB manually from Services (services.msc)
        echo.
        pause
        exit /b 1
    )
    echo [OK] MongoDB started successfully
) else (
    echo [OK] MongoDB is already running
)

echo.
echo Starting Backend Server...
echo.

REM Start the backend server
cd /d "backend"
start "Music School Backend Server" cmd /k "npm start"

REM Wait for server to start
echo Waiting for server to initialize...
timeout /t 5 >nul

echo.
echo Server started successfully!
echo.
echo Admin Login Credentials:
echo Email: admin@musicschooldelhi.com
echo Password: admin123
echo.
echo Access the application at:
echo - Login: http://localhost:5000/login.html
echo - Admin Dashboard: http://localhost:5000/admin-dashboard.html
echo - Student Dashboard: http://localhost:5000/student-dashboard.html
echo.
echo Press any key to exit...
pause >nul