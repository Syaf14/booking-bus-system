import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../global/AdminLayout';

function DetailScheduleManagement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/scheduleManagement/get-schedule-by-id/${id}`);
                setData(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching details:", err);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this schedule?")) return;
        try {
            await axios.delete(`http://localhost:3001/api/scheduleManagement/delete-schedule-bus/${id}`);
        } catch (err) { console.error(err); }
    };

    if (loading) return <AdminLayout><div className="p-5 text-center">Loading...</div></AdminLayout>;
    if (!data) return <AdminLayout><div className="p-5 text-center">Schedule not found.</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* Header & Back Button */}
                <div className="d-flex align-items-center mb-4 px-3">
                    <button className="btn btn-outline-secondary btn-sm rounded-3 me-3" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <div>
                        <h2 className="fw-bold text-dark mb-0">Schedule Details</h2>
                    </div>
                </div>

                <div className="row mx-2">
                    {/* Main Info Card */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-0">Route Information</h5>
                                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                                        Status: {data.status}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    <div className="col-md-6 text-center border-end">
                                        <div className="p-3 bg-light rounded-4 mb-3">
                                            <p className="text-muted small text-uppercase fw-bold mb-1">Departure</p>
                                            <h4 className="fw-bold text-primary mb-0">{data.depart_location}</h4>
                                            <div className="mt-2 text-dark fw-semibold">
                                                <i className="bi bi-clock me-1"></i> {data.depart_time}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <div className="p-3 bg-light rounded-4 mb-3">
                                            <p className="text-muted small text-uppercase fw-bold mb-1">Arrival</p>
                                            <h4 className="fw-bold text-success mb-0">{data.arrive_location}</h4>
                                            <div className="mt-2 text-dark fw-semibold">
                                                <i className="bi bi-clock me-1"></i> {data.arrive_time}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <hr className="my-2 opacity-25" />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="text-muted small d-block">Operating Day</label>
                                        <span className="fw-bold">{data.day_assigned}</span>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="text-muted small d-block">Bus assigned</label>
                                        <span className="fw-bold text-dark">Bus #{data.bus_code || 'N/A'}</span>
                                    </div>
                                    <div className="col-md-4 text-md-end">
                                        <label className="text-muted small d-block">Last Updated</label>
                                        <span className="fw-bold text-dark">March 23, 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Actions/Stats */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                            <h6 className="fw-bold mb-3">Operational Summary</h6>
                            <div className="d-flex align-items-center mb-3">
                                <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                                    <i className="bi bi-calendar-check text-primary"></i>
                                </div>
                                <div>
                                    <small className="text-muted d-block">Trip Frequency</small>
                                    <span className="fw-bold">Weekly</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-warning bg-opacity-10 p-2 rounded-3 me-3">
                                    <i className="bi bi-shield-check text-warning"></i>
                                </div>
                                <div>
                                    <small className="text-muted d-block">Safety Check</small>
                                    <span className="fw-bold">Passed</span>
                                </div>
                            </div>
                            <button className="btn btn-danger w-100 rounded-3" onClick={() => handleDelete(data.id)}>
                                <i className="bi bi-trash3 me-2"></i>Delete Record
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default DetailScheduleManagement;