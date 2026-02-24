@echo off
echo Starting Music School Delhi Application...
echo.
echo Make sure MongoDB is running first.
echo If MongoDB is not running, start it with: net start MongoDB
echo.
echo Starting backend server on http://localhost:5000
echo.
cd /d "D:\AI WEB\DRAFT PROJECT\backend"
start cmd /k "npm start"
echo.
echo Opening browser to login page...
timeout /t 3 /nobreak >nul
start http://localhost:5000/login.html
echo.
echo Server started successfully!
echo.
echo Access the application at: http://localhost:5000
echo Login page: http://localhost:5000/login.html
echo.
echo Admin Credentials:
echo Email: admin@musicschooldelhi.com
echo Password: admin123
echo.
pause