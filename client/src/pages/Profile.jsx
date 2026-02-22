import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../global/Layout';

function Profile() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-7">
            <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: "20px" }}>
              
              {/* Header Banner */}
              <div style={{ height: "140px", background: "linear-gradient(135deg, #35557E 0%, #24afe6 100%)" }}></div>

              <div className="card-body pt-0 px-4 pb-5">
                {/* Profile Icon Placeholder */}
                <div className="text-center" style={{ marginTop: "-70px" }}>
                  <div className="position-relative d-inline-block">
                    <div 
                      className="rounded-circle border border-4 border-white shadow d-flex align-items-center justify-content-center"
                      style={{ 
                        width: "140px", 
                        height: "140px", 
                        backgroundColor: "#e9ecef",
                        color: "#35557E"
                      }}
                    >
                      {/* Using Icon instead of <img> */}
                      <i className="bi bi-person-fill" style={{ fontSize: "5rem" }}></i>
                    </div>
                    {/* Floating Upload Hint Icon */}
                    <div 
                      className="position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                      style={{ width: "35px", height: "35px", cursor: "pointer", border: "1px solid #ddd" }}
                    >
                      <i className="bi bi-camera-fill text-primary" style={{ fontSize: "1rem" }}></i>
                    </div>
                  </div>
                  <h3 className="mt-3 fw-bold text-dark mb-1">Student Profile</h3>
                  <span className="badge rounded-pill bg-info text-dark px-3 py-2">Verified Account</span>
                </div>

                <div className="mt-5 px-lg-4">
                  <h5 className="mb-4 text-muted fw-bold border-bottom pb-2">
                    <i className="bi bi-info-circle me-2"></i>Personal Details
                  </h5>

                  {/* Information Grid */}
                  <div className="row g-4">
                    <div className="col-sm-6">
                      <label className="small text-uppercase text-muted fw-bold mb-1 d-block">Full Name</label>
                      <p className="fs-6 fw-medium text-dark border-start border-3 border-primary ps-3">
                        Wan Mohammad Syafrul Aiman Bin Wan Mohd Sanusi
                      </p>
                    </div>

                    <div className="col-sm-6">
                      <label className="small text-uppercase text-muted fw-bold mb-1 d-block">Email Address</label>
                      <p className="fs-6 fw-medium text-dark border-start border-3 border-info ps-3">
                        example@gmail.com
                      </p>
                    </div>

                    <div className="col-sm-6">
                      <label className="small text-uppercase text-muted fw-bold mb-1 d-block">Mobile Number</label>
                      <p className="fs-6 fw-medium text-dark border-start border-3 border-info ps-3">
                        +6017 289 2440
                      </p>
                    </div>

                    <div className="col-sm-6">
                      <label className="small text-uppercase text-muted fw-bold mb-1 d-block">Assigned College</label>
                      <p className="fs-6 fw-medium text-dark border-start border-3 border-info ps-3">
                        Kampus Bestari
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 d-flex gap-3 justify-content-center">
                  <button 
                    className="btn btn-primary px-5 py-2 rounded-pill fw-bold shadow transition-all"
                    onClick={() => navigate('/edit-profile')}
                    style={{ backgroundColor: "#35557E", border: "none" }}
                  >
                    <i className="bi bi-pencil-square me-2"></i>Edit Profile
                  </button>
                  <button 
                    className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold"
                    onClick={() => navigate('/ticket')}
                  >
                    View My Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .transition-all { transition: all 0.3s ease; }
        .transition-all:hover { transform: translateY(-2px); shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
        .border-primary { border-color: #35557E !important; }
        .border-info { border-color: #24afe6 !important; }
      `}</style>
    </Layout>
  );
}

export default Profile;