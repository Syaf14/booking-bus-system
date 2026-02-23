import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../global/AdminLayout';

function EditBus() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bus, setBus] = useState({
        bus_code: '',
        bus_name: '',
        capacity_seat: '',
        capacity_standing: '',
    });

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/busManagement/get-bus/${id}`);
                setBus(response.data);
            } catch (err) {
                console.error("Error fetching bus details:", err);
            }
        };
        fetchBusDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBus((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/busManagement/update-bus/${id}`, bus);
            alert("Bus updated successfully!");
            navigate('/admin-bus-management');
        } catch (err) {
            console.error("Update failed:", err);
            alert("Error updating bus");
        }
    };

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Modify Vehicle</h2>
                        <p className="text-muted small mb-0">Updating details for Bus ID: <span className="text-primary fw-bold">{id}</span></p>
                    </div>
                    <button className="btn btn-white border shadow-sm px-4 fw-bold" onClick={() => navigate('/admin-bus-management')}>
                        <i className="bi bi-arrow-left me-2"></i>Back to Fleet
                    </button>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-7 col-xl-5">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            
                            {/* Visual Accent */}
                            <div className="bg-warning p-2"></div>
                            
                            <div className="card-body p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <div className="bg-light d-inline-block p-3 rounded-circle mb-3">
                                        <i className="bi bi-pencil-square fs-3 text-warning"></i>
                                    </div>
                                    <h4 className="fw-bold">Edit Bus Information</h4>
                                </div>

                                <div className="row g-4">
                                    {/* Bus Code */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-muted text-uppercase">Bus Code</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-qr-code"></i></span>
                                            <input 
                                                type="text" 
                                                name='bus_code'
                                                className='form-control border-start-0 bg-light'
                                                value={bus.bus_code || ''} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Bus Name */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-muted text-uppercase">Vehicle Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-info-circle"></i></span>
                                            <input 
                                                type="text" 
                                                name='bus_name'
                                                className='form-control border-start-0 bg-light'
                                                value={bus.bus_name || ''} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Capacity Seat */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted text-uppercase">Seating</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0"><i className="bi bi-person-workspace"></i></span>
                                            <input 
                                                type="number" 
                                                name='capacity_seat'
                                                className='form-control border-start-0'
                                                value={bus.capacity_seat || ''} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Capacity Standing */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted text-uppercase">Standing</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0"><i className="bi bi-people"></i></span>
                                            <input 
                                                type="number" 
                                                name='capacity_standing'
                                                className='form-control border-start-0'
                                                value={bus.capacity_standing || ''} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="col-12 mt-5">
                                        <button className="btn btn-primary w-100 py-3 fw-bold shadow-sm rounded-3 mb-2" onClick={handleSave}>
                                            <i className="bi bi-save me-2"></i>Update Vehicle Details
                                        </button>
                                        <button className="btn btn-link w-100 text-muted text-decoration-none small" onClick={() => navigate('/admin-bus-management')}>
                                            Cancel and return
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default EditBus;