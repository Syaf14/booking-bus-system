import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../global/AdminLayout';
import axios from 'axios';

function EditStudentManagement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        full_name: '',
        phone_no: '',
        college_name: '',
        class_id: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRes = await axios.get(`http://localhost:3001/api/userManagement/get-all-user-by-id/${id}`);
                const classRes = await axios.get(`http://localhost:3001/api/userManagement/get-active-class`);
                setFormData({
                    ...userRes.data,
                    class_id: userRes.data.class_id || '' // Ensure it's not null for the select
                });
                setClasses(classRes.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/userManagement/update-user/${id}`, formData);
            alert("User updated successfully!");
            navigate('/admin-user-management'); // Adjust route to your user list page
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        {/* Breadcrumb/Back link */}
                        <button className="btn btn-link text-decoration-none text-muted mb-3 p-0" onClick={() => navigate(-1)}>
                            <i className="bi bi-arrow-left me-2"></i> Back to User Management
                        </button>

                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <h3 className="fw-bold mb-0">Edit User Profile</h3>
                                <p className="text-muted small">Update account details and personal information</p>
                            </div>
                            
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <h5 className="mb-3 text-primary fw-semibold">Account Information</h5>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Username</label>
                                            <input type="text" name="name" className="form-control bg-light border-0" value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Email Address</label>
                                            <input type="email" name="email" className="form-control bg-light border-0" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Assigned Class</label>
                                            <select 
                                                name="class_id" 
                                                className="form-select bg-light border-0" 
                                                value={formData.class_id} 
                                                onChange={handleChange}
                                            >
                                                <option value="">Unassigned / No Class</option>
                                                {classes.map((cls) => (
                                                    <option key={cls.id} value={cls.id}>
                                                        {cls.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Account Role</label>
                                            <select 
                                                name="role" 
                                                className="form-select bg-light border-0" 
                                                value={formData.role} 
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>Select Role</option>
                                                <option value="student">Student</option>
                                                <option value="class rep">Class Rep</option>
                                            </select>
                                        </div>
                                    </div>

                                    <hr className="my-4 opacity-25" />

                                    <h5 className="mb-3 text-primary fw-semibold">Personal Profile</h5>
                                    <div className="row mb-4">
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label small fw-bold">Full Name (As per IC)</label>
                                            <input type="text" name="full_name" className="form-control bg-light border-0" value={formData.full_name} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Phone Number</label>
                                            <input type="text" name="phone_no" className="form-control bg-light border-0" value={formData.phone_no} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">College / Residential Name</label>
                                            <input type="text" name="college_name" className="form-control bg-light border-0" value={formData.college_name} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 justify-content-end">
                                        <button type="button" className="btn btn-light px-4 border" onClick={() => navigate(-1)}>Cancel</button>
                                        <button type="submit" className="btn btn-dark px-4 shadow-sm">Update User</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default EditStudentManagement;