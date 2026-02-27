import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBusRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    bus_id: '',
    depart_location: '',
    depart_time: '',
    arrive_location: '',
    arrive_time: '',
    day_assigned: ''
  });

  useEffect(() => {
    // Fetch both the route data and the bus list
    const fetchData = async () => {
      try {
        const [routeRes, busesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/busManagement/get-bus-route/${id}`),
          axios.get(`http://localhost:5000/api/busManagement/all-buses`) // You'll need this endpoint
        ]);
        
        setFormData(routeRes.data);
        setBuses(busesRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/busManagement/update-bus-route/${id}`, formData);
      alert("Updated successfully!");
      navigate('/admin-bus-management');
    } catch (err) {
      alert("Failed to update");
    }
  };
  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h3 className="mb-4">Edit Bus Route</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Bus Selection */}
            <div className="col-md-6 mb-3">
              <label className="small fw-bold">Bus Code</label>
              <select 
                name="bus_id" 
                className="form-select" 
                value={formData.bus_id} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Bus</option>
                {buses.map(bus => (
                  <option key={bus.id} value={bus.id}>
                    {bus.bus_code}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Selection - Using the Toggle Style we made earlier! */}
            <div className="col-md-6 mb-3">
              <label className="small fw-bold">Assigned Day</label>
              <select name="day_assigned" className="form-select" value={formData.day_assigned} onChange={handleChange} required>
                <option value="" disabled selected>- Select Day-</option>
                <option value="isnin">Isnin</option>
                <option value="selasa">Selasa</option>
                <option value="rabu">Rabu</option>
                <option value="khamis">Khamis</option>
                <option value="jumaat">Jumaat</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="small fw-bold">Departure Location</label>
              <input type="text" name="depart_location" className="form-control" value={formData.depart_location} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="small fw-bold">Arrival Location</label>
              <input type="text" name="arrive_location" className="form-control" value={formData.arrive_location} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="small fw-bold">Departure Time</label>
              <input type="time" name="depart_time" className="form-control" value={formData.depart_time} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="small fw-bold">Arrival Time</label>
              <input type="time" name="arrive_time" className="form-control" value={formData.arrive_time} onChange={handleChange} />
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary px-4 fw-bold" style={{ backgroundColor: "#1150af" }}>
              UPDATE ROUTE
            </button>
            <button type="button" className="btn btn-light ms-2" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBusRoute;