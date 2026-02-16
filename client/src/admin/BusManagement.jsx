import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function BusManagement() {
    const navigate = useNavigate();

    const [buses, setBuses] = useState([]);

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
        const response = await axios.get("http://localhost:5000/api/busManagement/all-buses");
        setBuses(response.data);
        } catch (err) {
        console.error(err);
        }
    };

    const handleDelete = async (id) => {
        // Optional: implement soft delete
        try {
        await axios.delete(`http://localhost:5000/api/busManagement/delete-bus/${id}`);
        fetchBuses(); // refresh list
        } catch (err) {
        console.error(err);
        }
    };
  return (
    <div className='row col-md-12'>
      <div className='col-md-3 bg-secondary p-0' style={{height:"100vh"}}>
        <div className='title-navbar bg-white mb-3' style={{height:"15vh",width:"100%"}}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <h2 className='fst-italic'>ADMIN SYSTEM</h2>
          </div>
        </div>
        <div className='px-2 m-0'>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-dashboard')}><i className="bi bi-house-door-fill mx-3"></i>DASHBOARD</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate("/admin-bus-management")}><i className="bi bi-bus-front-fill mx-3"></i>BUS MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-schedule-management')}><i className="bi bi-calendar-week mx-3"></i>SCHEDULE TIMETABLE</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-booking-management')}><i className="bi bi-journal-bookmark-fill mx-3"></i>BOOKING MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-user-management')}><i className="bi bi-people-fill mx-3"></i>USER MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-report-notification-management')}><i className="bi bi-card-text mx-3"></i>REPORT & NOTIFICATION</a>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className='col-md-9 bg-light' style={{height:"100vh"}}>
        <div className='bg-white border-bottom border-3'style={{height:"20vh",width:"100%"}}>
            <div className='px-5 d-flex align-items-center h-100 w-100'>
                <h1 className='fw-bold'>Bus Management</h1>
            </div>
        </div>
        <div className='py-3 px-3'>
            <button className='btn btn-success' onClick={() => navigate('/add-bus')}>+ADD BUS</button>
        </div>
        <div>
            <table className='table table-bordered'>
                <thead className=''>
                    <tr>
                        <td>
                            BUS CODE
                        </td>
                        <td>
                            BUS NAME
                        </td>
                        <td>
                            CAPACITY
                        </td>
                        <td>
                            STATUS
                        </td>
                        <td>
                            ACTION
                        </td>                        
                    </tr>
                </thead>
                <tbody>
                    {buses.map((bus) => (
                        <tr key={bus.id}>
                        <td>{bus.bus_code}</td>
                        <td>{bus.bus_name}</td>
                        <td>{bus.capacity}</td>
                        <td className='col text-center'>
                            <span className={`badge ${bus.deleted_at ? 'bg-danger' : 'bg-success'}`}>
                            {bus.deleted_at ? 'INACTIVE' : 'ACTIVE'}
                            </span>
                        </td>
                        <td className='text-center'>
                            <div className='btn-group text-white'>
                            <button className='btn btn-info'>EDIT</button>
                            <button className='btn btn-danger' onClick={() => handleDelete(bus.id)}>DELETE</button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    {buses.length === 0 && (
                        <tr>
                        <td colSpan="5" className="text-center">No buses found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default BusManagement