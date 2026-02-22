import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../global/AdminLayout';

function AddScheduleManagement() {
  const navigate = useNavigate();
  const [busRoute,setBusRoute] = useState([]);
  const [message, setMessage] = useState("");
  const [form,setForm] = useState({
    route_id:"",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/busManagement/all-bus-route`)
    .then(res => setBusRoute(res.data));
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
      setMessage(res.data.message); // display success message
      setForm({ route_id: "" }); // reset form
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <AdminLayout>
      <div className="d-flex justify-content-end" style={{height:"10vh"}}>
        <button className="btn btn-secondary mx-3 my-3" onClick={() => navigate('/admin-schedule-management')}>Back</button>
      </div>
      <div className='d-flex justify-content-center align-items-center' style={{height:"90vh"}}>
          <div className="card" style={{width:"70vh"}}>
            <div className="card-title text-center py-3">
              <h3>Add Schedule Bus</h3>
            </div>
            <div className="card-body">
              {message && <p className="bg-secondary p-3 rounded-3 text-white">{message}<i className="bi bi-bookmark-check-fill mx-2"></i></p>}
              <form onSubmit={handleSubmit}>
                <div className="row col-md-12 mb-2">
                  <div className="col-md-3">
                    <label>Route ID:</label>
                  </div>
                  <div className="col-md-9">
                    <select 
                    name="route_id" 
                    id="" 
                    onChange={handleChange} 
                    className='form-control'>
                      <option value="">-- Select Bus Route --</option>
                      {busRoute.map(busroute =>(
                        <option key={busroute.id} value={busroute.id}>
                          {busroute.depart_location} - {busroute.bus_code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </AdminLayout>
  )
}

export default AddScheduleManagement