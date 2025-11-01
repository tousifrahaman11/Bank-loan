@echo off
cls
echo ========================================
echo   TATA CAPITAL LOAN CHATBOT
echo   Simple Start (No Database Needed!)
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js is installed
echo.

echo Killing any existing Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo.

echo ========================================
echo   Starting Backend Server...
echo ========================================
start "Tata Backend - DO NOT CLOSE" cmd /k "cd /d %~dp0server && echo Starting backend... && npm start"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul
echo.

echo ========================================
echo   Starting Frontend Server...
echo ========================================
start "Tata Frontend - DO NOT CLOSE" cmd /k "cd /d %~dp0client && echo Starting frontend... && npm run dev"

echo.
echo ========================================
echo   🎉 SERVERS ARE STARTING!
echo ========================================
echo.
echo ✅ Backend: http://localhost:5000
echo ✅ Frontend: http://localhost:5173
echo.
echo 📝 Two new windows opened:
echo    1. Backend Server (port 5000)
echo    2. Frontend Server (port 5173)
echo.
echo ⏳ Wait 10 seconds, then open:
echo    👉 http://localhost:5173
echo.
echo ⚠️  DO NOT CLOSE the server windows!
echo.
echo Press any key to open browser...
pause >nul

start http://localhost:5173

echo.
echo ========================================
echo   ✅ ALL DONE!
echo ========================================
echo.
echo If browser didn't open, go to:
echo http://localhost:5173
echo.
echo To stop servers: Close the server windows
echo.
pause
