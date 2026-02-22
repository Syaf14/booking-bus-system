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

      setMessage(response.data.message);
      setBusCode("");
      setBusName("");
      setCapacitySeat("");
      setCapacityStanding("");
      setPlateNo("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <AdminLayout>
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
                            <div className="d-flex justify-content-between mb-3">
                              <div className="col-md-5">
                                <div className="row">
                                    <label className="mb-2">Capacity Seat:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={capacitySeat}
                                        onChange={(e) => setCapacitySeat(e.target.value)}
                                        required
                                    />
                                </div>
                              </div>
                              <div className="col-md-5">
                                <div className="row">
                                    <label className="mb-2">Capacity Standing:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={capacityStanding}
                                        onChange={(e) => setCapacityStanding(e.target.value)}
                                        required
                                    />
                                </div>
                              </div>
                            </div>
                              <div className="row mb-3">
                                  <label className="mb-2">Plate No:</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      value={plateNo}
                                      onChange={(e) => setPlateNo(e.target.value)}
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
    </AdminLayout>
  )
}

export default AddBus