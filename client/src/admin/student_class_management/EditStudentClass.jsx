import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../global/AdminLayout';
import axios from 'axios';

function EditStudentClass() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        class_name: "",
        semester: "",
        capacity_class: "",
        rep_email: ""
    });

    // 1. Fetch existing data on load
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/studentClassManagement/get-all-student-classes-by-id/${id}`);
                setFormData({
                    class_name: res.data.class_name,
                    semester: res.data.semester,
                    capacity_class: res.data.capacity_class,
                    rep_email: res.data.rep_email || ""
                });
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Failed to load class details.");
            }
        };
        fetchClassData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Mapping class_name (FE) to name (BE)
            const payload = {
                name: formData.class_name,
                semester: formData.semester,
                capacity_class: formData.capacity_class
            };

            await axios.put(`http://localhost:5000/api/studentClassManagement/update-student-class/${id}`, payload);
            alert("Class Updated Successfully!");
            navigate('/admin-student-classes-management');
        } catch (err) {
            console.error("Update error:", err);
            alert(err.response?.data?.message || "Failed to update class");
        }
    };

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="mb-4">
                            <h2 className="fw-bold">Edit Class Info</h2>
                            <p className="text-muted">Update details for <strong>{formData.class_name}</strong></p>
                        </div>

                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                {/* 2. Added onSubmit handler here */}
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Class / Course Name</label>
                                        <input 
                                            type="text" 
                                            name="class_name"
                                            className="form-control form-control-lg bg-light border-0 fs-6" 
                                            value={formData.class_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Semester</label>
                                            <select 
                                                name="semester"
                                                className="form-select form-control-lg bg-light border-0 fs-6"
                                                value={formData.semester}
                                                onChange={handleChange}
                                            >
                                                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Capacity</label>
                                            <input 
                                                type="number" 
                                                name="capacity_class"
                                                className="form-control form-control-lg bg-light border-0 fs-6" 
                                                value={formData.capacity_class}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Class Representative Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><i className="bi bi-envelope"></i></span>
                                            <input 
                                                type="email" 
                                                name="rep_email"
                                                className="form-control form-control-lg bg-light border-0 fs-6" 
                                                value={formData.rep_email || 'N/A'}
                                                onChange={handleChange}
                                                disabled // Usually rep change logic is separate/more complex
                                            />
                                        </div>
                                        <div className="form-text text-info">
                                            <i className="bi bi-info-circle me-1"></i>
                                            Rep Email is managed through user profiles.
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm">
                                            Save Changes
                                        </button>
                                        <button type="button" className="btn btn-light btn-lg w-100 border" onClick={() => navigate(-1)}>
                                            Cancel
                                        </button>
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

export default EditStudentClass;