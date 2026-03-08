import React, { useState, useEffect } from 'react'
import AdminLayout from '../../global/AdminLayout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddAdmin() {
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message,setMessage] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
        const res = await axios.post(`http://localhost:5000/api/auth/register-admin`, form);
        setMessage({ type: "success", text: res.data.message });
        } catch (error) {
        setMessage({ 
            type: "danger", 
            text: error.res ? error.res.data.message : "Server error" 
        });
        }
    };
  return (
    <AdminLayout>
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        
        {/* Navigation & Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Add New Admin</h2>
            <p className="text-muted small mb-0">Register a new admin to this system</p>
          </div>
          <button className="btn btn-white border shadow-sm px-4 fw-bold" onClick={() => navigate('/admin-user-management')}>
            <i className="bi bi-arrow-left me-2"></i>Back to User Management
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              
              {/* Decorative Header */}
              <div className="bg-primary p-2"></div>
              
              <div className="card-body p-4 p-md-5">
                {message && (
                  <div className={`alert alert-${message.type} alert-dismissible fade show rounded-3 mb-4`} role="alert">
                    <i className={`bi ${message.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-12">
                      <label className="form-label fw-bold small text-muted text-uppercase">Admin Name <span className='text-danger'>*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><i className="bi bi-people"></i></span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-2 bg-light focus-none"
                          placeholder="e.g. Ali Admin"
                          name='name'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold small text-muted text-uppercase">Email <span className='text-danger'>*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                        <input
                        type="text"
                        className="form-control border-start-0 bg-light py-2"
                        placeholder="e.g. example@gmail.com"
                        name='email'
                        onChange={handleChange}
                        required
                      />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-muted text-uppercase">Password <span className='text-danger'>*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-lock-fill"></i></span>
                        <input
                          type="password"
                          className="form-control py-2"
                          placeholder="***********"
                          name='password'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-muted text-uppercase">Confirm Password <span className='text-danger'>*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-lock"></i></span>
                        <input
                          type="password"
                          className="form-control py-2"
                          placeholder="***********"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow-sm rounded-3">
                        <i className="bi bi-plus-circle-fill me-2"></i> Register Admin to system
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-muted small">
                <i className="bi bi-info-circle me-1"></i> 
                All fields are required. Make sure the Email is available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddAdmin