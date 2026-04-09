@echo off
REM Booking Bus System - Auto Setup & Run for Windows
REM Double-click this file to start everything automatically

cd /d "%~dp0"
setlocal enabledelayedexpansion

cls
echo.
echo ========================================
echo  Booking Bus System Setup
echo ========================================
echo.

REM Check Node.js
echo [1/5] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color C
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Download and install from:
    echo https://nodejs.org/
    echo.
    echo Make sure to check "Add to PATH" during installation.
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

REM Check MySQL
echo [2/5] Checking MySQL...
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color C
    echo.
    echo ERROR: MySQL is not installed or not in PATH!
    echo.
    echo Download from:
    echo https://dev.mysql.com/downloads/mysql/
    echo.
    echo During installation, make sure MySQL is added to your system PATH.
    echo.
    pause
    exit /b 1
)
echo [OK] MySQL found

echo.
echo [3/5] Setting up Database...
echo.

REM Prompt for credentials
set MYSQL_USER=root
set MYSQL_PASSWORD=

echo MySQL Configuration:
echo Default username is 'root'
echo.
set /p MYSQL_USER="MySQL Username (press Enter for 'root'): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

set /p MYSQL_PASSWORD="MySQL Password: "

echo.
echo Importing database...
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% < booking_bus_system.sql 2>nul
if %ERRORLEVEL% NEQ 0 (
    color C
    echo.
    echo ERROR: Could not connect to MySQL
    echo.
    echo Possible reasons:
    echo - MySQL is not running
    echo - Wrong username or password
    echo - MySQL is not installed properly
    echo.
    echo Please check and try again.
    echo.
    pause
    exit /b 1
)
echo [OK] Database created

echo.
echo [4/5] Installing Backend Dependencies...
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
echo [5/5] Installing Frontend Dependencies...
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
echo ========================================
echo  Starting Application...
echo ========================================
echo.

REM Open backend in new window
cd ..\server
echo Starting Backend Server...
start "Backend - Port 3001" cmd /k "npm start"
timeout /t 3 /nobreak >nul

REM Open frontend in new window
cd ..\client
echo Starting Frontend...
start "Frontend - Port 3000" cmd /k "npm start"

echo.
color A
echo ========================================
echo  READY!
echo ========================================
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:3001
echo.
echo Username:  admin
echo Password:  admin123
echo.
echo Two windows will open. Keep them running!
echo You can close this window.
echo.
pause
