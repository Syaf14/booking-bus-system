# Booking Bus System - Windows Setup Guide

A complete bus booking system with Node.js backend, React frontend, and MySQL database.

## ⚡ FASTEST WAY - Double-Click & Done!

**Just double-click `setup.bat` and everything runs automatically!**

The script will:
- ✅ Check for Node.js and MySQL
- ✅ Import the database
- ✅ Install all dependencies
- ✅ Start both backend and frontend
- ✅ Open the app automatically

---

## Prerequisites (One-Time Setup)

Install these if you don't have them:

### 1. Install Node.js
- Download: [nodejs.org](https://nodejs.org/)
- Click "Download" (LTS version recommended)
- Run the installer
- **IMPORTANT:** Check ✓ "Add to PATH" during installation
- Restart your computer after installation

### 2. Install MySQL
- Download: [dev.mysql.com/downloads/mysql](https://dev.mysql.com/downloads/mysql/)
- Download "MySQL Community Server"
- Run the installer
- During installation, set password (remember it!)
- **IMPORTANT:** Check ✓ "Configure MySQL Server as a Windows Service"
- Start MySQL from Services: Press `Win+R`, type `services.msc`, find MySQL, right-click → Start

### 3. Verify Installation
- Open Command Prompt (`Win+R`, type `cmd`)
- Type: `node -v` → Should show version number
- Type: `npm -v` → Should show version number
- Type: `mysql -u root -p` → Enter your MySQL password → Should connect

---

## Running the Project

### Method 1: Auto Setup (Recommended)

1. Navigate to `booking-bus-system` folder
2. **Double-click `setup.bat`**
3. Enter your MySQL password when asked
4. Wait for the script to finish
5. Two windows will open automatically
6. Go to `http://localhost:3000` in your browser

### Method 2: Manual Setup

**Step 1: Import Database**
```bash
mysql -u root -p < booking_bus_system.sql
```
Enter your MySQL password when prompted.

**Step 2: Start Backend (Terminal 1)**
```bash
cd server
npm install
npm start
```

**Step 3: Start Frontend (Terminal 2)**
```bash
cd client
npm install
npm start
```

## Ports & URLs

| Component | URL | Port |
|-----------|-----|------|
| Frontend (React) | http://localhost:3000 | 3000 |
| Backend (Express) | http://localhost:3001 | 3001 |
| Database (MySQL) | localhost | 3306 |

## Project Structure

```
booking-bus-system/
├── server/                 # Express.js backend
│   ├── server.js          # Main server file
│   ├── routes/            # API endpoints
│   ├── public/            # Static files
│   └── package.json       # Dependencies
├── client/                # React frontend
│   ├── src/               # Source code
│   ├── public/            # HTML template
│   └── package.json       # Dependencies
├── booking_bus_system.sql # Database schema
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Bus Management
- `GET /api/busManagement/all` - Get all buses
- `POST /api/busManagement/add` - Add new bus
- `PUT /api/busManagement/update/:id` - Update bus
- `DELETE /api/busManagement/delete/:id` - Delete bus

### Schedule Management
- `GET /api/schedules/all` - Get all schedules
- `POST /api/schedules/add` - Add new schedule
- `PUT /api/schedules/update/:id` - Update schedule
- `DELETE /api/schedules/delete/:id` - Delete schedule

### Bookings
- `GET /api/bookings/all` - Get all bookings
- `POST /api/bookings/create` - Create new booking
- `PUT /api/bookings/update/:id` - Update booking
- `DELETE /api/bookings/cancel/:id` - Cancel booking

### Users
- `GET /api/users/all` - Get all users
- `PUT /api/users/update/:id` - Update user

### Reports
- `GET /api/reports/revenue` - Get revenue reports
- `GET /api/reports/bookings` - Get booking reports

## Troubleshooting

### "Port 3000 already in use"
```bash
# Kill the process using port 3000 (macOS/Linux):
lsof -ti:3000 | xargs kill -9

# On Windows, use Task Manager or:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot connect to MySQL"
- Check if MySQL is running: `mysql -u root -p`
- Verify username/password in `server/server.js`
- Ensure database was imported: `mysql -u root -p -e "show databases;"`

### "Dependencies installation fails"
```bash
# Clear npm cache and try again:
npm cache clean --force
npm install
```

### "Port 3001 already in use"
```bash
# Kill the process using port 3001:
lsof -ti:3001 | xargs kill -9  # macOS/Linux
```

## Development Mode

For automatic server reload on code changes:

```bash
cd server
npm install -g nodemon  # Install once globally
npm run dev
```

## Default Test Account

After running the SQL script, use these credentials:

- **Username:** `admin`
- **Password:** `admin123`

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** React
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcrypt

## Support

If you encounter issues:
1. Check that MySQL, Node.js, and npm are installed
2. Verify all ports (3000, 3001, 3306) are available
3. Review the troubleshooting section above
4. Check terminal output for error messages

## License

ISC

---

**Ready to run?**
```bash
# Terminal 1: Database + Server
mysql -u root -p < booking_bus_system.sql
cd server && npm install && npm start

# Terminal 2: Frontend
cd client && npm install && npm start
```
