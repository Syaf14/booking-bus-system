import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../global/AdminLayout'
import axios from 'axios';

function BusManagement() {
    const navigate = useNavigate();

    const [buses, setBuses] = useState([]);
    const [busRoute, setBusRoute] = useState([]);

    // --- Pagination State ---
    const [busPage, setBusPage] = useState(1);
    const busPerPage = 5;

    const [routePage, setRoutePage] = useState(1);
    const routePerPage = 10;

    useEffect(() => {
        fetchBuses();
        fetchBusRoutes();
    }, []);

    // --- Data Fetching ---
    const fetchBuses = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/busManagement/all-buses");
            setBuses(response.data);
        } catch (err) { console.error(err); }
    };

    const fetchBusRoutes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/busManagement/all-bus-route");
            setBusRoute(response.data);
        } catch (err) { console.error(err); }
    };

    // --- Pagination Logic ---
    const indexOfLastBus = busPage * busPerPage;
    const indexOfFirstBus = indexOfLastBus - busPerPage;
    const currentBuses = buses.slice(indexOfFirstBus, indexOfLastBus);

    const indexOfLastRoute = routePage * routePerPage;
    const indexOfFirstRoute = indexOfLastRoute - routePerPage;
    const currentRoutes = busRoute.slice(indexOfFirstRoute, indexOfLastRoute);

    const paginateBuses = (pageNumber) => setBusPage(pageNumber);
    const paginateRoutes = (pageNumber) => setRoutePage(pageNumber);

    // Helper for Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this bus?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/busManagement/delete-bus/${id}`);
            fetchBuses();
        } catch (err) { console.error(err); }
    };

    const handleDeleteRoute = async (id) => {
        // Confirm with the user before deleting
        if (!window.confirm("Are you sure you want to delete this bus route?")) return;

        try {
            // Calling the soft-delete endpoint we refactored earlier
            const response = await axios.delete(`http://localhost:5000/api/busManagement/delete-bus-route/${id}`);
            
            if (response.status === 200) {
                alert("Route deleted successfully");
                fetchBusRoutes(); // Refresh the routes table to show updated data
            }
        } catch (err) {
            console.error("Failed to delete route:", err);
            alert("Error deleting route. Please try again.");
        }
    };

    return (
      <AdminLayout>
        <div className='bg-white border-bottom border-3 mb-2' style={{ height: "20vh", width: "100%" }}>
            <div className='px-5 d-flex align-items-center h-100 w-100'>
                <h1 className='fw-bold'>Bus Management</h1>
            </div>
        </div>
        <div className='card p-0 mb-4'>
          <div className='card-header p-0'>
            <div className='d-flex justify-content-end py-3 px-3'>
                <button className='btn btn-success mx-3' onClick={() => navigate('/add-bus')}>+ADD BUS</button>
            </div>
          </div>
          <div className='card-body pb-0'>
            {/* --- BUS TABLE --- */}
            <div className='mb-4 px-3'>
                <div className='mb-2'>
                  <h5 className='fst-italic'>Buses (Page {busPage})</h5>
                </div>
                <table className='table table-bordered bg-white'>
                    <thead>
                        <tr className='text-center'>
                            <th>NO</th>
                            <th>BUS CODE</th>
                            <th>BUS NAME</th>
                            <th>CAPACITY</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBuses.map((bus, index) => (
                            <tr key={bus.id}>
                                <td>{indexOfFirstBus + index + 1}</td>
                                <td>{bus.bus_code}</td>
                                <td>{bus.bus_name}</td>
                                <td>S:{bus.capacity_seat} / ST:{bus.capacity_standing}</td>
                                <td className='text-center'>
                                    <span className={`badge ${bus.deleted_at ? 'bg-danger' : 'bg-success'}`}>
                                        {bus.deleted_at ? 'INACTIVE' : 'ACTIVE'}
                                    </span>
                                </td>
                                <td className='text-center'>
                                    <button className='btn btn-sm btn-secondary me-2' onClick={() => navigate(`/admin-edit-bus-management/${bus.id}`)}>EDIT</button>
                                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(bus.id)}>DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Bus Pagination Buttons */}
                <div className='d-flex justify-content-center'>
                    {[...Array(Math.ceil(buses.length / busPerPage))].map((_, i) => (
                        <button key={i} onClick={() => paginateBuses(i + 1)} className={`btn btn-sm mx-1 ${busPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-header p-0'>
            <div className='d-flex justify-content-end py-3 px-3'>
                <button className='btn btn-success' onClick={() => navigate('/add-bus-route')}>+ADD BUS ROUTE</button>
            </div>
          </div>
          <div className='card-body pb-0'>
                    {/* --- ROUTE TABLE --- */}
          <div className='mb-5 px-3'>
              <div className='mb-2'>
                <h5 className='fst-italic'>Routes (Page {routePage})</h5>
              </div>
              <table className='table table-bordered bg-white'>
                  <thead>
                      <tr className='text-center'>
                          <th>NO</th>
                          <th>BUS CODE</th>
                          <th>DEPART</th>
                          <th>ARRIVE</th>
                          <th>ACTION</th>
                      </tr>
                  </thead>
                  <tbody>
                      {currentRoutes.map((route, index) => (
                          <tr key={route.id} className='text-center'>
                              <td>{indexOfFirstRoute + index + 1}</td>
                              <td>{route.bus_code}</td>
                              <td>{route.depart_location} ({route.depart_time})</td>
                              <td>{route.arrive_location} ({route.arrive_time})</td>
                              <td>
                                  <button className='btn btn-sm btn-danger' onClick={() => handleDeleteRoute(route.id)}>DELETE</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {/* Route Pagination Buttons */}
              <div className='d-flex justify-content-center'>
                  {[...Array(Math.ceil(busRoute.length / routePerPage))].map((_, i) => (
                      <button key={i} onClick={() => paginateRoutes(i + 1)} className={`btn btn-sm mx-1 ${routePage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}>
                          {i + 1}
                      </button>
                  ))}
              </div>
          </div>
          </div>
        </div>              
      </AdminLayout>
    );
  }
export default BusManagement;