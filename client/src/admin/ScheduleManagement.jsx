import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

function ScheduleManagement() {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/scheduleManagement/get-all-schedule-bus");
            setSchedule(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-end mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Schedule Management</h2>
                        <p className="text-muted small mb-0">Coordinate bus timings and operational windows</p>
                    </div>
                    <div>
                        <button className="btn btn-primary px-4 shadow-sm fw-bold" onClick={() => navigate('/add-schedule-bus')}>
                            <i className="bi bi-calendar-plus me-2"></i>Add Schedule
                        </button>
                    </div>
                </div>

                {/* Schedule Table Card */}
                <div className="card border-0 shadow-sm mx-3 rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-0 py-3">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                                <i className="bi bi-clock-history text-primary"></i>
                            </div>
                            <h5 className="mb-0 fw-bold">Active Timetables</h5>
                        </div>
                    </div>
                    
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle mb-0">
                            <thead className="bg-light">
                                <tr className="text-muted small text-uppercase">
                                    <th className="ps-4" style={{ width: "80px" }}>No</th>
                                    <th>Route Path</th>
                                    <th className="text-center">Departure</th>
                                    <th className="text-center">Arrival</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {schedule.map((item, index) => (
                                    <tr key={item.id} className="hover-row">
                                        <td className="ps-4 fw-bold text-muted">{index + 1}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="fw-bold text-dark">{item.depart_location}</span>
                                                <i className="bi bi-arrow-right mx-2 text-primary"></i>
                                                <span className="fw-bold text-dark">{item.arrive_location}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-light text-primary border px-3 py-2 rounded-3">
                                                <i className="bi bi-door-open me-1"></i> {item.depart_time}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-light text-success border px-3 py-2 rounded-3">
                                                <i className="bi bi-door-closed me-1"></i> {item.arrive_time}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-success-subtle text-success rounded-pill px-3">
                                                Confirmed
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group shadow-sm rounded-3 overflow-hidden">
                                                <button className="btn btn-white btn-sm border-end px-3 hover-primary" title="View Details">
                                                    <i className="bi bi-eye text-primary"></i>
                                                </button>
                                                <button className="btn btn-white btn-sm px-3 hover-danger" title="Delete Schedule">
                                                    <i className="bi bi-trash3 text-danger"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {schedule.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-5 text-center">
                                            <div className="text-muted">
                                                <i className="bi bi-calendar-x display-4"></i>
                                                <p className="mt-2">No schedules found in the database.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="card-footer bg-white border-0 py-3 text-end">
                        <small className="text-muted">Showing {schedule.length} total entries</small>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ScheduleManagement;