import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../global/AdminLayout";

function AddBus() {
  const navigate = useNavigate();
  const [busCode, setBusCode] = useState("");
  const [busName, setBusName] = useState("");
  const [capacitySeat, setCapacitySeat] = useState("");
  const [capacityStanding, setCapacityStanding] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/busManagement/add-bus",
        {
          bus_code: busCode,
          bus_name: busName,
          capacity_seat: capacitySeat,
          capacity_standing: capacityStanding,
          plate_no: plateNo,
        }
      );
      setMessage({ type: "success", text: response.data.message });
      // Reset form
      setBusCode(""); setBusName(""); setCapacitySeat(""); setCapacityStanding(""); setPlateNo("");
    } catch (error) {
      setMessage({ 
        type: "danger", 
        text: error.response ? error.response.data.message : "Server error" 
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        
        {/* Navigation & Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Add New Vehicle</h2>
            <p className="text-muted small mb-0">Register a new bus into the fleet system</p>
          </div>
          <button className="btn btn-white border shadow-sm px-4 fw-bold" onClick={() => navigate('/admin-bus-management')}>
            <i className="bi bi-arrow-left me-2"></i>Back to Fleet
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              
              {/* Decorative Header */}
              <div className="bg-primary p-2"></div>
              
              <div className="card-body p-4 p-md-5">
                {message && (
                  <div className={`alert alert-${message.type} alert-dismissible fade show rounded-3 mb-4`} role="alert">
                    <i className={`bi ${message.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    
                    {/* Bus Code */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-muted text-uppercase">Bus Identification Code</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><i className="bi bi-qr-code"></i></span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0 bg-light focus-none"
                          placeholder="e.g. BUS-001"
                          value={busCode}
                          onChange={(e) => setBusCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Plate Number */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-muted text-uppercase">Plate Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><i className="bi bi-hash"></i></span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0 bg-light"
                          placeholder="ABC 1234"
                          value={plateNo}
                          onChange={(e) => setPlateNo(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Bus Name */}
                    <div className="col-12">
                      <label className="form-label fw-bold small text-muted text-uppercase">Vehicle Display Name</label>
                      <input
                        type="text"
                        className="form-control bg-light py-2"
                        placeholder="e.g. City Express Shuttle"
                        value={busName}
                        onChange={(e) => setBusName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Capacity Section */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-muted text-uppercase">Seating Capacity</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-person-workspace"></i></span>
                        <input
                          type="number"
                          className="form-control py-2"
                          placeholder="0"
                          value={capacitySeat}
                          onChange={(e) => setCapacitySeat(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-muted text-uppercase">Standing Capacity</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-people"></i></span>
                        <input
                          type="number"
                          className="form-control py-2"
                          placeholder="0"
                          value={capacityStanding}
                          onChange={(e) => setCapacityStanding(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="col-12 mt-5">
                      <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow-sm rounded-3">
                        <i className="bi bi-plus-circle-fill me-2"></i> Register Vehicle to Fleet
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
            
            {/* Quick Tip */}
            <div className="text-center mt-4">
              <p className="text-muted small">
                <i className="bi bi-info-circle me-1"></i> 
                All fields are required. Make sure the Bus Code is unique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddBus;