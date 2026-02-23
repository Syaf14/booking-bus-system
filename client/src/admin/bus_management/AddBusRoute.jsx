import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../global/AdminLayout";

function AddBusRoute() {
    const navigate = useNavigate();
    const [busId, setBusId] = useState([]);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        bus_id: "",
        depart_location: "",
        depart_time: "",
        arrive_location: "",
        arrive_time: "",
    })

    useEffect(() => {
        axios.get("http://localhost:5000/api/busManagement/all-buses")
            .then(res => setBusId(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/busManagement/add-bus-route", form);
            setMessage({ type: "success", text: "Route successfully established!" });
            // Optional: reset form or navigate
        } catch (error) {
            setMessage({ type: "danger", text: "Failed to create route. Please check your data." });
        }
    };

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Create New Route</h2>
                        <p className="text-muted small mb-0">Link a vehicle to a specific journey path and schedule</p>
                    </div>
                    <button className="btn btn-white border shadow-sm px-4 fw-bold" onClick={() => navigate('/admin-bus-management')}>
                        <i className="bi bi-arrow-left me-2"></i>Back to Fleet
                    </button>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="bg-success p-2"></div>
                            
                            <div className="card-body p-4 p-md-5">
                                {message && (
                                    <div className={`alert alert-${message.type} alert-dismissible fade show rounded-3 mb-4`} role="alert">
                                        {message.text}
                                        <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* Bus Selection Row */}
                                    <div className="mb-5 pb-4 border-bottom">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-3">Vehicle Assignment</label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text bg-light"><i className="bi bi-bus-front text-primary"></i></span>
                                            <select 
                                                name="bus_id" 
                                                onChange={handleChange} 
                                                className="form-select bg-light fw-bold"
                                                required
                                            >
                                                <option value="">-- Click to select assigned bus --</option>
                                                {busId.map(bus => (
                                                    <option key={bus.id} value={bus.id}>
                                                        {bus.bus_code} | {bus.bus_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-5">
                                        {/* Departure Section */}
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                                                    <i className="bi bi-geo-alt-fill text-primary"></i>
                                                </div>
                                                <h5 className="fw-bold mb-0">Departure</h5>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label small text-muted">Point of Origin</label>
                                                <input type="text" name="depart_location" className="form-control py-2 shadow-none border-0 bg-light" placeholder="Station name..." onChange={handleChange} required />
                                            </div>
                                            
                                            <div>
                                                <label className="form-label small text-muted">Departure Time</label>
                                                <input type="time" name="depart_time" className="form-control py-2 shadow-none border-0 bg-light" onChange={handleChange} required />
                                            </div>
                                        </div>

                                        {/* Arrival Section */}
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-success bg-opacity-10 p-2 rounded-circle me-2">
                                                    <i className="bi bi-flag-fill text-success"></i>
                                                </div>
                                                <h5 className="fw-bold mb-0">Arrival</h5>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label small text-muted">Destination Point</label>
                                                <input type="text" name="arrive_location" className="form-control py-2 shadow-none border-0 bg-light" placeholder="Terminal name..." onChange={handleChange} required />
                                            </div>
                                            
                                            <div>
                                                <label className="form-label small text-muted">Arrival Time</label>
                                                <input type="time" name="arrive_time" className="form-control py-2 shadow-none border-0 bg-light" onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-5 text-center">
                                        <button type="submit" className="btn btn-success px-5 py-3 fw-bold shadow rounded-pill">
                                            <i className="bi bi-map-fill me-2"></i> Confirm and Create Route
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddBusRoute;