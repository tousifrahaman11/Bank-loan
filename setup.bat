@echo off
echo ========================================
echo Tata Capital Loan Chatbot Setup
echo ========================================
echo.

echo Step 1: Installing Server Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies!
    pause
    exit /b %errorlevel%
)
echo Server dependencies installed successfully!
echo.

echo Step 2: Installing Client Dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies!
    pause
    exit /b %errorlevel%
)
echo Client dependencies installed successfully!
echo.

echo Step 3: Setting up environment files...
cd ..
if not exist "server\.env" (
    echo Creating server .env file...
    copy "server\.env.example" "server\.env" >nul 2>&1
    if exist "server\.env" (
        echo Server .env created! Please update with your MongoDB URI and JWT Secret.
    )
)

if not exist "client\.env" (
    echo Creating client .env file...
    copy "client\.env.example" "client\.env" >nul 2>&1
    if exist "client\.env" (
        echo Client .env created!
    )
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Update server\.env with your MongoDB URI and JWT Secret
echo 2. Run: cd server ^&^& node utils\seedDatabase.js (to seed dummy data)
echo 3. Start Backend: cd server ^&^& npm start
echo 4. Start Frontend: cd client ^&^& npm run dev
echo.
echo For detailed instructions, see README.md
echo.
pause
