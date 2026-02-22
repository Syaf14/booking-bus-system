import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function EditBus() {

    const {id} = useParams();
    const [bus,setBus] = useState({
      bus_code: '',
      bus_name: '',
      capacity_seat: '',
      capacity_standing: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/busManagement/get-bus/${id}`);
            console.log("Full API Response:", response);
            console.log("Actual Data:", response.data);
            setBus(response.data); // Set the bus data to state
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
    navigate('/admin-bus-management')
  } catch (err) {
    console.error("Update failed:", err);
    alert("Error updating bus");
  }
};

  return (
    <div className='' style={{height:"100vh"}}>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card" style={{width:"70vh"}}>
          <div className="card-title text-center py-3">
            <h1>Edit Bus</h1>
          </div>
          <div className="card-body">
            <div className='row col-md-12 mb-4'>
              <div className='col-md-3'>
                <label>Bus Id: </label>                
              </div>
              <div className='col-md-9'>
                <input 
                type="text" 
                name='bus_code'
                className='form-control'
                value={bus.bus_code || ''} 
                onChange={handleChange}
                />
              </div>
            </div>
            <div className='row col-md-12 mb-4'>
              <div className='col-md-3'>
                <label>Bus Name: </label>                
              </div>
              <div className='col-md-9'>
                <input 
                type="text" 
                name='bus_name'
                className='form-control'
                value={bus.bus_name || ''} 
                onChange={handleChange}
                />
              </div>
            </div>
            <div className='row col-md-12 mb-4'>
              <div className='col-md-3'>
                <label>Capacity Seat: </label>                
              </div>
              <div className='col-md-9'>
                <input 
                type="text" 
                name='capacity_seat'
                className='form-control'
                value={bus.capacity_seat || ''} 
                onChange={handleChange}
                />
              </div>
            </div>
            <div className='row col-md-12 mb-4'>
              <div className='col-md-3'>
                <label>Capacity Standing: </label>                
              </div>
              <div className='col-md-9'>
                <input 
                type="text" 
                name='capacity_standing'
                className='form-control'
                value={bus.capacity_standing || ''} 
                onChange={handleChange}
                />
              </div>
            </div>
            <button className="btn btn-primary w-100" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBus