import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/auth/logout') 
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5 px-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">System Overview</h2>
            <p className="text-muted small mb-0">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <button className="btn btn-outline-danger px-4 fw-bold shadow-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="row g-4 px-3">
          
          {/* Card: Total Users */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative overflow-hidden">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-3">
                    <i className="bi bi-people-fill text-primary fs-4"></i>
                  </div>
                  <span className="text-success small fw-bold">+12% <i className="bi bi-arrow-up"></i></span>
                </div>
                <h6 className="text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Registered Users</h6>
                <h2 className="fw-bold mb-0">20</h2>
              </div>
              {/* Subtle background decoration */}
              <i className="bi bi-people position-absolute text-light" style={{ fontSize: '5rem', right: '-10px', bottom: '-20px', opacity: '0.3' }}></i>
            </div>
          </div>

          {/* Card: Total Bookings */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6282ec 0%, #202A66 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="bg-white bg-opacity-20 p-3 rounded-3">
                    <i className="bi bi-ticket-detailed text-white fs-4"></i>
                  </div>
                  <span className="badge bg-white bg-opacity-25 rounded-pill">Monthly Target</span>
                </div>
                <h6 className="text-white-50 text-uppercase fw-bold mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Bookings</h6>
                <h2 className="fw-bold mb-0">500</h2>
              </div>
              <i className="bi bi-ticket position-absolute text-white" style={{ fontSize: '5rem', right: '-10px', bottom: '-20px', opacity: '0.1' }}></i>
            </div>
          </div>

          {/* Card: Active Buses */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative overflow-hidden">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded-3">
                    <i className="bi bi-bus-front-fill text-success fs-4"></i>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="spinner-grow spinner-grow-sm text-success me-2" role="status"></span>
                    <span className="text-success small fw-bold">Live</span>
                  </div>
                </div>
                <h6 className="text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Buses Currently Active</h6>
                <h2 className="fw-bold mb-0">43</h2>
              </div>
              <i className="bi bi-geo-alt position-absolute text-light" style={{ fontSize: '5rem', right: '-10px', bottom: '-20px', opacity: '0.3' }}></i>
            </div>
          </div>

        </div>

        {/* Informational Section (Optional) */}
        <div className="mt-5 px-3">
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <i className="bi bi-info-circle-fill text-primary fs-3"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-0">System Status: All Services Operational</h6>
                <p className="text-muted small mb-0">Everything is running smoothly. Last system backup: 2 hours ago.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}

export default AdminDashboard