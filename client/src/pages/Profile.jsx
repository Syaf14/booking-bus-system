import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../global/UserLayout';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  // 1. Initialize as null because we are fetching ONE user, not a list
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/user-profile/${id}`);
        // 2. This is the single object from rows[0]
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchProfile();
  }, [id]); // Refetch if the ID changes

  // 3. Guard Clause: Don't try to render if data isn't here yet
  if (loading) return <UserLayout><div className="text-center mt-5">Loading Profile...</div></UserLayout>;
  if (!profile) return <UserLayout><div className="text-center mt-5">User not found.</div></UserLayout>;

  return (
    <UserLayout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-7">
            {/* 4. REMOVED .map() - We just use 'profile' directly now */}
            <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: "20px" }}>
              <div style={{ height: "140px", background: "linear-gradient(135deg, #35557E 0%, #24afe6 100%)" }}></div>

              <div className="card-body pt-0 px-4 pb-5">
                <div className="text-center" style={{ marginTop: "-70px" }}>
                  <div className="rounded-circle border border-4 border-white shadow d-flex align-items-center justify-content-center bg-light mx-auto" style={{ width: "140px", height: "140px" }}>
                    <i className="bi bi-person-fill text-secondary" style={{ fontSize: "5rem" }}></i>
                  </div>
                  <h3 className="mt-3 fw-bold text-dark mb-1">{profile.name}</h3>
                  <span className="badge rounded-pill bg-info text-dark px-3 py-2 text-uppercase fw-bolder">{profile.role}</span>
                </div>

                <div className="mt-5 px-lg-4 mb-2">
                  <h5 className="mb-4 text-muted fw-bold border-bottom pb-2">Personal Details</h5>
                  <div className="row g-4">
                    <div className="col-sm-6">
                      <label className="small text-muted fw-bold d-block">Full Name</label>
                      <p className="fs-6 fw-medium border-start border-3 border-primary ps-3">{profile.full_name}</p>
                    </div>
                    <div className="col-sm-6">
                      <label className="small text-muted fw-bold d-block">Email Address</label>
                      <p className="fs-6 fw-medium border-start border-3 border-info ps-3">{profile.email}</p>
                    </div>
                    <div className="col-sm-6">
                      <label className="small text-muted fw-bold d-block">Mobile Number</label>
                      <p className="fs-6 fw-medium border-start border-3 border-info ps-3">{profile.phone_no}</p>
                    </div>
                    <div className="col-sm-6">
                      <label className="small text-muted fw-bold d-block">Class</label>
                      <p className="fs-6 fw-medium border-start border-3 border-info ps-3">{profile.name || "No Class Assigned"}</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button 
                    onClick={() => navigate(`/edit-profile/${id}`)} 
                    className='btn btn-primary'
                  >
                    Edit Profile
                  </button>
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