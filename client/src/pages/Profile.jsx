import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../global/UserLayout';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Ensure your backend query now joins with student_classes to get the class name
        const response = await axios.get(`http://localhost:3001/api/auth/user-profile/${id}`);
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchProfile();
  }, [id]);

  if (loading) return <UserLayout><div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><p className="mt-2">Loading Profile...</p></div></UserLayout>;
  if (!profile) return <UserLayout><div className="text-center mt-5">User not found.</div></UserLayout>;

  return (
    <UserLayout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-9">
            
            <div className="card shadow-lg border-0" style={{ borderRadius: "24px", overflow: "hidden" }}>
              {/* Header/Cover Section */}
              <div style={{ 
                height: "160px", 
                background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                position: "relative" 
              }}>
                <div className="position-absolute w-100 text-end p-3">
                   <span className="badge bg-white text-primary shadow-sm px-3 py-2">Account ID: #{profile.id}</span>
                </div>
              </div>

              <div className="card-body pt-0 px-4 px-md-5 pb-5">
                {/* Avatar and Main Title */}
                <div className="text-center" style={{ marginTop: "-80px" }}>
                  <div className="position-relative d-inline-block">
                    <div className="rounded-circle border border-5 border-white shadow-lg d-flex align-items-center justify-content-center bg-white mx-auto" 
                         style={{ width: "160px", height: "160px" }}>
                      <i className="bi bi-person-circle text-primary" style={{ fontSize: "6rem" }}></i>
                    </div>
                  </div>
                  <h2 className="mt-3 fw-bold text-dark mb-0">{profile.full_name || profile.name}</h2>
                  <p className="text-muted mb-3">@{profile.name}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <span className="badge rounded-pill bg-primary px-4 py-2 text-uppercase shadow-sm" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                        {profile.role}
                    </span>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="mt-5">
                  <div className="d-flex align-items-center mb-4">
                    <h5 className="mb-0 fw-bold text-primary">General Information</h5>
                    <div className="flex-grow-1 ms-3 border-bottom opacity-25"></div>
                  </div>

                  <div className="row g-4">
                    {/* Student ID Field */}
                    <div className="col-md-6">
                      <div className="p-3 rounded-4 bg-light border-0 h-100 transition-hover">
                        <label className="small text-uppercase text-muted fw-bolder mb-1 d-block">Student ID / Matrix</label>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-card-text me-2 text-primary"></i>
                          <span className="fs-6 fw-bold">{profile.student_id || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-4 bg-light border-0 h-100">
                        <label className="small text-uppercase text-muted fw-bolder mb-1 d-block">Class Group</label>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-door-open me-2 text-primary"></i>
                          <span className="fs-6 fw-bold">{profile.class_name || "Unassigned"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-4 bg-light border-0 h-100">
                        <label className="small text-uppercase text-muted fw-bolder mb-1 d-block">Email Address</label>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-envelope me-2 text-primary"></i>
                          <span className="fs-6 fw-bold text-break">{profile.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-4 bg-light border-0 h-100">
                        <label className="small text-uppercase text-muted fw-bolder mb-1 d-block">Phone Number</label>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-telephone me-2 text-primary"></i>
                          <span className="fs-6 fw-bold">{profile.phone_no || "Not provided"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
                  <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none text-muted">
                    <i className="bi bi-arrow-left me-2"></i> Back
                  </button>
                  
                  <div className="d-flex gap-2">
                    {/* NEW: Report/Complaint Button */}
                    <button 
                      onClick={() => navigate(`/submit-report/${id}`)} 
                      className="btn btn-outline-danger px-4 py-2 rounded-pill shadow-sm"
                    >
                      <i className="bi bi-exclamation-triangle me-2"></i> Report Issue
                    </button>

                    <button 
                      onClick={() => navigate(`/edit-profile/${id}`)} 
                      className='btn btn-primary px-5 py-2 rounded-pill shadow'
                    >
                      <i className="bi bi-pencil-square me-2"></i> Edit Profile
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Profile;