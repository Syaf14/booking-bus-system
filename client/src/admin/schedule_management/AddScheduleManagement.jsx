import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../global/AdminLayout';

function AddScheduleManagement() {
  const navigate = useNavigate();
  const [busRoute, setBusRoute] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // Array for multi-select
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = () => {
    axios.get(`http://localhost:5000/api/busManagement/get-available-bus-route`)
      .then(res => setBusRoute(res.data))
      .catch(err => console.error(err));
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === busRoute.length) {
      setSelectedIds([]); // Clear all
    } else {
      setSelectedIds(busRoute.map(route => route.id)); // Select all available
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/scheduleManagement/add-schedule-bus",
        { route_ids: selectedIds } // Send the array
      );
      setMessage({ type: "success", text: res.data.message });
      setSelectedIds([]);
      fetchRoutes(); // Refresh to hide newly added routes
    } catch (err) {
      setMessage({ type: "danger", text: "Failed to deploy schedules" });
    }
  };

  return (
    <AdminLayout>
      {/* ... Header ... */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Activate Schedule</h2>
            <p className="text-muted small mb-0">Deploy a pre-defined route into the active daily schedule</p>
          </div>
          <button className="btn btn-white border shadow-sm px-4 fw-bold" onClick={() => navigate('/admin-schedule-management')}>
            <i className="bi bi-arrow-left me-2"></i>Back to Schedules
          </button>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label className="fw-bold small text-muted text-uppercase">Select Routes</label>
          <button type="button" className="btn btn-sm btn-outline-info" onClick={handleSelectAll}>
            {selectedIds.length === busRoute.length ? 'Deselect All' : 'Select All Available'}
          </button>
        </div>

        <div className="list-group mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {busRoute.map(route => (
            <div key={route.id} className="list-group-item d-flex align-items-center py-3">
              <input 
                type="checkbox" 
                className="form-check-input me-3"
                checked={selectedIds.includes(route.id)}
                onChange={() => toggleSelect(route.id)}
              />
              <div>
                <span className="fw-bold">{route.bus_code}</span> | {route.depart_location} → {route.arrive_location}
                <div className="small text-muted">{route.day_assigned} at {route.depart_time}</div>
              </div>
            </div>
          ))}
          {busRoute.length === 0 && <div className="text-center p-4 text-muted">No new routes available to deploy.</div>}
        </div>

        <button 
          type="submit" 
          className="btn btn-info w-100 py-3 fw-bold text-white shadow-sm"
          disabled={selectedIds.length === 0}
        >
          <i className="bi bi-lightning-fill me-2"></i> Deploy {selectedIds.length} Schedule(s)
        </button>
      </form>
    </AdminLayout>
  );
}

export default AddScheduleManagement;