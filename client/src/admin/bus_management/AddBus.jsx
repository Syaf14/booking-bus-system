import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBus() {
  const navigate = useNavigate();
  const [busCode, setBusCode] = useState("");
  const [busName, setBusName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/busManagement/add-bus",
        {
          bus_code: busCode,
          bus_name: busName,
          capacity: capacity,
        }
      );

      setMessage(response.data.message);
      setBusCode("");
      setBusName("");
      setCapacity("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div className='row col-md-12'>
      <div className='col-3 bg-secondary p-0' style={{height:"100vh"}}>
        <div className='title-navbar bg-white mb-3' style={{height:"30vh",width:"100%"}}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <h2>ADMIN SYSTEM</h2>
          </div>
        </div>
        <div className="px-2 m-0">
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-dashboard')}>DASHBOARD</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate("/admin-bus-management")}>BUS MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn'>SCHEDULE TIMETABLE</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn'>BOOKING MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn'>USER MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn'>REPORT & NOTIFICATION</a>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className='col-9 bg-light' style={{height:"100vh"}}>
        <div className="d-flex justify-content-end" style={{height:"10vh"}}>
            <button className="btn btn-secondary mx-3 my-3" onClick={() => navigate('/admin-bus-management')}>Back</button>
        </div>
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"90vh"}}>
            <div className="card">
                <div className="card-title text-center pt-2">
                    <h2>Add New Bus</h2>
                </div>
                <hr />
                <div className="card-body">
                    <div style={{ padding: "20px" }}>
                        {message && <p className="bg-secondary p-3 rounded-3 text-white">{message}<i className="bi bi-bookmark-check-fill mx-2"></i></p>}

                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label className="mb-2">Bus Code:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={busCode}
                                    onChange={(e) => setBusCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="row mb-3">
                                <label className="mb-2">Bus Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={busName}
                                    onChange={(e) => setBusName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="row mb-3">
                                <label className="mb-2">Capacity:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-success">Add Bus</button>
                            </div>
                        </form>
                    </div>                    
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddBus