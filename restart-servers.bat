@echo off
echo ========================================
echo Restarting Tata Capital Loan Chatbot
echo ========================================
echo.

echo Killing any existing Node processes...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Starting Backend Server...
start "Tata Backend" cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Tata Frontend" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Check the new terminal windows for logs.
echo.
pause
