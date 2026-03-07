import React, { useEffect, useState } from 'react';
import UserLayout from '../global/UserLayout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    // State keys MUST match your database/backend columns
    const [profile, setProfile] = useState({
        full_name: '',
        phone_no: '',
        student_id: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/user-profile/${id}`);
                setProfile({
                    full_name: response.data.full_name || '',
                    phone_no: response.data.phone_no || '',
                    student_id: response.data.student_id || '',
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProfile();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/auth/update-profile/${id}`, profile);
            alert("Profile updated successfully!");
            navigate(`/profile/${id}`);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Error updating profile");
        }
    };

    if (loading) return <UserLayout><div className="text-center mt-5">Loading...</div></UserLayout>;

    return (
        <UserLayout>
            <div className="container-fluid py-5" style={{ backgroundColor: '#f0f2f5', minHeight: '90vh' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="card border-0 shadow-lg rounded-4">
                            
                            {/* Header Section */}
                            <div className="p-4 text-center border-bottom bg-white rounded-top-4">
                                <div className="bg-primary d-inline-block p-3 rounded-circle mb-3 shadow-sm">
                                    <i className="bi bi-person-gear fs-3 text-white"></i>
                                </div>
                                <h4 className="fw-bold text-dark">Account Settings</h4>
                                <p className="text-muted small">Update your personal information below</p>
                            </div>

                            <div className="card-body p-4 p-md-5">
                                <div className="row g-4">
                                    
                                    {/* Full Name */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-secondary text-uppercase">Full Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-primary">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                name='full_name'
                                                className='form-control border-start-0 ps-0'
                                                placeholder="Enter your full name"
                                                value={profile.full_name} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Student ID */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-secondary text-uppercase">Student ID / Badge</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-primary">
                                                <i className="bi bi-card-text"></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                name='student_id'
                                                className='form-control border-start-0 ps-0'
                                                placeholder="Enter student ID"
                                                value={profile.student_id} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-secondary text-uppercase">Mobile Number</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-primary">
                                                <i className="bi bi-telephone"></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                name='phone_no'
                                                className='form-control border-start-0 ps-0'
                                                placeholder="e.g. +60123456789"
                                                value={profile.phone_no} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="col-12 mt-5">
                                        <button 
                                            className="btn btn-primary w-100 py-3 fw-bold shadow rounded-3 mb-3" 
                                            onClick={handleSave}
                                            style={{ letterSpacing: '0.5px' }}
                                        >
                                            Save Changes
                                        </button>
                                        <button 
                                            className="btn btn-outline-secondary w-100 py-2 border-0 fw-bold" 
                                            onClick={() => navigate(`/profile/${id}`)}
                                        >
                                            Discard Changes
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

export default EditProfile;