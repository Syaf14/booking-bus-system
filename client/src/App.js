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
import AddBusRoute from './admin/bus_management/AddBusRoute';
import EditBus from './admin/bus_management/EditBus';
import AddScheduleManagement from './admin/schedule_management/AddScheduleManagement';
import Profile from './pages/Profile';
import Ticket from './pages/Ticket';
import SeatBook from './booking/SeatBook';
import EditBusRoute from './admin/bus_management/EditBusRoute';
import ClassRepDashboard from './pages/ClassRepDashboard';
import ClassRepTicket from './pages/ClassRepTicket';
import EditProfile from './profile/EditProfile';
import StudentClassesManagement from './admin/StudentClassesManagement';
import AddAdmin from './admin/user_management/AddAdmin';
import DetailStudentClass from './admin/student_class_management/DetailStudentClass';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-bus-management" element={<BusManagement />}/>
        <Route path="/admin-edit-bus-route-management/:id" element={<EditBusRoute />}/>
        <Route path="/admin-edit-bus-management/:id" element={<EditBus />} />
        <Route path="/admin-schedule-management" element={<ScheduleManagement />}/>
        <Route path="/admin-booking-management" element={<BookingManagement />}/>
        <Route path="/admin-user-management" element={<UserManagement />}/>
        <Route path="/admin-student-classes-management" element={<StudentClassesManagement />}/>
        <Route path="/admin-report-notification-management" element={<ReportNotificationManagement />}/>
        <Route path="/add-bus" element={<AddBus />}/>
        <Route path="/add-bus-route" element={<AddBusRoute />} />
        <Route path="/add-schedule-bus" element={<AddScheduleManagement />}/>
        <Route path="/add-admin" element={<AddAdmin />}/>
        <Route path="/detail-student-classes" element={<DetailStudentClass />} />

        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/student-class-rep-dashboard" element={<ClassRepDashboard />} />  
        <Route path="/booking" element={<Booking />}/>
        <Route path="/seat-booking" element={<SeatBooking />}/>
        <Route path="/seat-booking/:id" element={<SeatBook />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/ticket-class-rep/:id" element={<ClassRepTicket />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App