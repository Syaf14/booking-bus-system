@echo off
REM Booking Bus System - Start Application
REM Make sure database is already set up before running this

cd /d "%~dp0"

cls
echo.
echo ========================================
echo  Booking Bus System - Starting App
echo ========================================
echo.

echo [1/2] Installing Backend Dependencies...
cd server
call npm install >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    color C
    echo [ERROR] Backend installation failed
    pause
    exit /b 1
)
echo [OK] Backend ready

echo.
echo [2/2] Installing Frontend Dependencies...
cd ..\client
call npm install >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    color C
    echo [ERROR] Frontend installation failed
    pause
    exit /b 1
)
echo [OK] Frontend ready

echo.
echo Starting Application...
echo.

REM Open backend in new window
cd ..\server
start "Backend - Port 3001" cmd /k "npm start"
timeout /t 2 /nobreak >nul

REM Open frontend in new window
cd ..\client
start "Frontend - Port 3000" cmd /k "npm start"

echo.
color A
echo ========================================
echo  App Running!
echo ========================================
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:3001
echo.
echo Username:  admin
echo Password:  admin123
echo.
pause
