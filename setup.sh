#!/bin/bash

# Booking Bus System - Auto Setup Script for macOS/Linux
# This script automatically sets up and runs the entire project

set -e  # Exit on error

echo "================================================"
echo "  Booking Bus System - Setup & Run"
echo "================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "   Download from: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found${NC} ($(node -v))"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found${NC} ($(npm -v))"

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}✗ MySQL is not installed${NC}"
    echo "   Download from: https://dev.mysql.com/downloads/mysql/"
    exit 1
fi
echo -e "${GREEN}✓ MySQL found${NC}"

echo ""
echo "================================================"
echo "  Setting up Database"
echo "================================================"

# Prompt for MySQL credentials
read -p "Enter MySQL username (default: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -sp "Enter MySQL password: " MYSQL_PASSWORD
echo ""

# Create database
echo "📦 Creating database from booking_bus_system.sql..."
if mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < booking_bus_system.sql 2>/dev/null; then
    echo -e "${GREEN}✓ Database created successfully${NC}"
else
    echo -e "${RED}✗ Failed to import database${NC}"
    echo "   Check your MySQL username/password"
    exit 1
fi

echo ""
echo "================================================"
echo "  Setting up Backend Server"
echo "================================================"

cd server
echo "📦 Installing backend dependencies..."
npm install --silent
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

echo ""
echo "================================================"
echo "  Setting up Frontend Client"
echo "================================================"

cd ../client
echo "📦 Installing frontend dependencies..."
npm install --silent
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo ""
echo "================================================"
echo "  Starting Application"
echo "================================================"
echo ""

# Start backend in background
cd ../server
echo -e "${YELLOW}🚀 Starting Backend Server (port 3001)...${NC}"
npm start &
BACKEND_PID=$!
sleep 2

# Start frontend
cd ../client
echo -e "${YELLOW}🚀 Starting Frontend (port 3000)...${NC}"
npm start &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo ""
echo "================================================"
echo "  Application is Running"
echo "================================================"
echo ""
echo -e "${GREEN}Frontend:${NC}  http://localhost:3000"
echo -e "${GREEN}Backend:${NC}   http://localhost:3001"
echo -e "${GREEN}Database:${NC}  MySQL (localhost:3306)"
echo ""
echo "📝 Test Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "📝 To stop the application, press Ctrl+C"
echo ""

# Keep script running
wait
