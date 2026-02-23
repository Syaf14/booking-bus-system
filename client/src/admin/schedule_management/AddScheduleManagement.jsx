import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../global/AdminLayout';

function AddScheduleManagement() {
  const navigate = useNavigate();
  const [busRoute, setBusRoute] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    route_id: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/busManagement/all-bus-route`)
      .then(res => setBusRoute(res.data))
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
      const res = await axios.post(
        "http://localhost:5000/api/scheduleManagement/add-schedule-bus",
        form
      );
      setMessage({ type: "success", text: res.data.message });
      setForm({ route_id: "" });
    } catch (err) {
      setMessage({ 
        type: "danger", 
        text: err.response?.data?.message || "Something went wrong" 
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Activate Schedule</h2>
            <p className="text-muted small mb-0">Deploy a pre-defined route into the active daily schedule</p>
          </div>
          <button className="btn btn-white border shadow-sm px-4 fw-bold" onClick={() => navigate('/admin-schedule-management')}>
            <i className="bi bi-arrow-left me-2"></i>Back to Schedules
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              
              {/* Visual Indicator */}
              <div className="bg-info p-2"></div>
              
              <div className="card-body p-4 p-md-5">
                
                {/* Icon & Title */}
                <div className="text-center mb-4">
                  <div className="bg-info bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
                    <i className="bi bi-calendar-check fs-3 text-info"></i>
                  </div>
                  <h4 className="fw-bold">Schedule Deployment</h4>
                </div>

                {message && (
                  <div className={`alert alert-${message.type} alert-dismissible fade show rounded-3 mb-4`} role="alert">
                    <i className={`bi ${message.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-muted text-uppercase mb-3">Select Established Route</label>
                    <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-signpost-split text-info"></i>
                      </span>
                      <select 
                        name="route_id" 
                        value={form.route_id}
                        onChange={handleChange} 
                        className="form-select border-start-0 ps-0 bg-white fw-semibold"
                        required
                      >
                        <option value="">-- Choose a Route to Activate --</option>
                        {busRoute.map(route => (
                          <option key={route.id} value={route.id}>
                            {route.bus_code} | {route.depart_location} → {route.arrive_location}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Contextual Note */}
                  <div className="bg-light p-3 rounded-3 mb-4 border-start border-info border-4">
                    <div className="d-flex">
                      <i className="bi bi-info-circle-fill text-info me-2"></i>
                      <p className="small text-muted mb-0">
                        Activating a route will make it visible to students for booking. Please ensure the vehicle and driver are ready.
                      </p>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-info w-100 py-3 fw-bold text-white shadow-sm rounded-3 mt-2">
                    <i className="bi bi-lightning-fill me-2"></i> Deploy Schedule Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddScheduleManagement;