import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../global/AdminLayout';
import axios from 'axios';

function DetailStudentClass() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const fetchDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/studentClassManagement/get-all-student-classes-by-id/${id}`);
            setClassData(response.data);
        } catch (error) {
            console.error("Error fetching class details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!classData) {
        return (
            <AdminLayout>
                <div className="container py-5 text-center">
                    <h4>Class not found</h4>
                    <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                {/* Breadcrumb & Actions */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none text-muted p-0">
                        <i className="bi bi-arrow-left me-2"></i>Back to Management
                    </button>
                    <button className="btn btn-primary px-4 shadow-sm" onClick={() => navigate(`/admin-edit-student-classes-management/${id}`)}>
                        <i className="bi bi-pencil-square me-2"></i>Edit Class
                    </button>
                </div>

                <div className="row px-3">
                    {/* Main Info Card */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-primary bg-opacity-10 p-3 rounded-4 me-3">
                                        <i className="bi bi-book-half fs-3 text-primary"></i>
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0">{classData.class_name}</h3>
                                        <p className="text-muted mb-0">General information about the student group</p>
                                    </div>
                                </div>

                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="text-uppercase small fw-bold text-muted d-block mb-1">Class Name</label>
                                        <p className="fs-5 fw-semibold">{classData.class_name || 'N/A'}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-uppercase small fw-bold text-muted d-block mb-1">Semester</label>
                                        <span className="badge bg-dark px-3 py-2 fs-6">
                                            Semester {classData.semester}
                                        </span>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-uppercase small fw-bold text-muted d-block mb-1">Student Capacity</label>
                                        <p className="fs-5 fw-semibold">{classData.capacity_class} Students</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-uppercase small fw-bold text-muted d-block mb-1">Status</label>
                                        <p>
                                            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3">
                                                Active
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Representative Info */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <h5 className="fw-bold">Class Representative</h5>
                            </div>
                            <div className="card-body px-4 pb-4">
                                <div className="text-center mb-4">
                                    <div className="avatar-placeholder bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                        <i className="bi bi-person-fill fs-1 text-secondary"></i>
                                    </div>
                                    {classData.rep_name ? (
                                        <>
                                            <h5 className="mb-1">{classData.rep_name}</h5>
                                            <p className="text-muted small">{classData.rep_email}</p>
                                        </>
                                    ) : (
                                        <p className="text-muted italic">No Representative Assigned</p>
                                    )}
                                </div>
                                
                                {classData.rep_email && (
                                    <>
                                        <hr className="text-muted opacity-25" />
                                        <div className="d-grid gap-2">
                                            <a href={`mailto:${classData.rep_email}`} className="btn btn-outline-secondary btn-sm">
                                                <i className="bi bi-envelope me-2"></i>Contact Rep
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default DetailStudentClass;