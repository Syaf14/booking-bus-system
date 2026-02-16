import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './authentication/Login'
import Register from './authentication/Register'
import AdminDashboard from './admin/AdminDashboard'
import Dashboard from './pages/Dashboard'
import Booking from './booking/Booking'
import BusManagement from './admin/BusManagement'
import AddBus from './admin/bus_management/AddBus'
import ScheduleManagement from './admin/ScheduleManagement';
import BookingManagement from './admin/BookingManagement';
import SeatBooking from './seat-booking/SeatBooking';
import UserManagement from './admin/UserManagement';
import ReportNotificationManagement from './admin/ReportNotificationManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-bus-management" element={<BusManagement />}/>
        <Route path="/admin-schedule-management" element={<ScheduleManagement />}/>
        <Route path="/admin-booking-management" element={<BookingManagement />}/>
        <Route path="/admin-user-management" element={<UserManagement />}/>
        <Route path="/admin-report-notification-management" element={<ReportNotificationManagement />}/>
        <Route path="/add-bus" element={<AddBus />}/>

        <Route path="/student-dashboard" element={<Dashboard />} /> 
        <Route path="/booking" element={<Booking />}/>
        <Route path="/seat-booking" element={<SeatBooking />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App