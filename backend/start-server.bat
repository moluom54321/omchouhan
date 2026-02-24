@echo off
echo Starting Music School Backend Server...
echo.

REM Check if node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo npm is not installed. Please install Node.js which includes npm.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd /d "%~dp0"

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the server
echo Starting server on port 5000...
npm run start

pause