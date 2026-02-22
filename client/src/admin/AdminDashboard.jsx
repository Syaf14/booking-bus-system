import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. (Optional) Call the backend logout API if you need to clear cookies
    axios.post('http://localhost:5000/api/auth/logout') 
    
    // 2. Clear the token from storage
    localStorage.removeItem('token'); 
    
    // 3. Redirect to login page
    navigate('/');
  };
  return (
    <AdminLayout>
      <div className='bg-white border-bottom border-3'style={{height:"20vh",width:"100%"}}>
          <div className='px-5 d-flex justify-content-between align-items-center h-100 w-100'>
              <h1 className='fw-bold'>Dashboard</h1>
              <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>
          </div>
      </div>
      <div style={{height:"50vh"}}>
        <div className="d-flex justify-content-evenly align-items-center" style={{height:"50vh"}}>
          <div className="card text-white" style={{height:"40vh",aspectRatio:"1/1",backgroundColor:"#6282ec"}}>
            <div className="card-body">
              <div className='' style={{height:"10vh"}}>
                <h4>Total User</h4>
              </div>
              <div className='d-flex justify-content-end align-items-end p-2' style={{height:"25vh"}}>
                <h4>20</h4>
              </div>
            </div>
          </div>
          <div className="card text-white" style={{height:"40vh",aspectRatio:"1/1",backgroundColor:"#6282ec"}}>
            <div className="card-body">
              <div className='' style={{height:"10vh"}}>
                <h4>Total Bookings</h4>
              </div>
              <div className='d-flex justify-content-end align-items-end p-2' style={{height:"25vh"}}>
                <h4>500</h4>
              </div>
            </div>
          </div>
          <div className="card text-white" style={{height:"40vh",aspectRatio:"1/1",backgroundColor:"#6282ec"}}>
            <div className="card-body">
              <div className='' style={{height:"10vh"}}>
                <h4>Total Bus Active</h4>
              </div>
              <div className='d-flex justify-content-end align-items-end p-2' style={{height:"25vh"}}>
                <h4>43</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard