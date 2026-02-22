import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../global/AdminLayout";

function AddBusRoute() {
    const navigate = useNavigate();
    const [busId, setBusId] = useState([]);
    const [message, setMessage] = useState("");
    const [form,setForm] =useState({
        bus_id: "",
        depart_location: "",
        depart_time: "",
        arrive_location: "",
        arrive_time: "",
    })

    useEffect(() => {
        axios.get("http://localhost:5000/api/busManagement/all-buses")
        .then(res => setBusId(res.data));
    },[]);

    const handleChange = (e) => {

    setForm({
    ...form,
    [e.target.name]: e.target.value
    });

    };
    const handleSubmit = async (e) => {
       e.preventDefault();

        await axios.post(
        "http://localhost:5000/api/busManagement/add-bus-route",
        form
        );

        alert("Route created");
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-end" style={{height:"10vh"}}>
                <button className="btn btn-secondary mx-3 my-3" onClick={() => navigate('/admin-bus-management')}>Back</button>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{minHeight:"90vh"}}>
                <div className="card">
                    <div className="card-title text-center pt-2">
                        <h2>Add New Bus Route</h2>
                    </div>
                    <hr />
                    <div className="card-body">
                        <div style={{ padding: "20px" }}>
                            {message && <p className="bg-secondary p-3 rounded-3 text-white">{message}<i className="bi bi-bookmark-check-fill mx-2"></i></p>}

                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label className="mb-2">Bus Id:</label>
                                    <select 
                                    name="bus_id" 
                                    id="" 
                                    onChange={handleChange} 
                                    className="form-control">
                                        <option value="">-- Select Bus --</option>
                                        {busId.map(bus => (
                                        <option key={bus.id} value={bus.id}>
                                        {bus.bus_code} - {bus.bus_name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="row mb-3">
                                    <label className="mb-2">Depart Location:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="depart_location"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="row mb-3">
                                    <label className="mb-2">Destination Location:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="arrive_location"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="row col-md-12 mb-3">
                                    <div className="col-md-6">
                                        <label className="mb-2">Depart Time:</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            name="depart_time"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="mb-2">Arrive Time:</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            name="arrive_time"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

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

export default AddBusRoute