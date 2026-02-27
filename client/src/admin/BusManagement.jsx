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
    const busPerPage = 10;
    const [routePage, setRoutePage] = useState(1);
    const routePerPage = 10;

    useEffect(() => {
        fetchBuses();
        fetchBusRoutes();
    }, []);

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

    const indexOfLastBus = busPage * busPerPage;
    const indexOfFirstBus = indexOfLastBus - busPerPage;
    const currentBuses = buses.slice(indexOfFirstBus, indexOfLastBus);

    const indexOfLastRoute = routePage * routePerPage;
    const indexOfFirstRoute = indexOfLastRoute - routePerPage;
    const currentRoutes = busRoute.slice(indexOfFirstRoute, indexOfLastRoute);

    const paginateBuses = (pageNumber) => setBusPage(pageNumber);
    const paginateRoutes = (pageNumber) => setRoutePage(pageNumber);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this bus?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/busManagement/delete-bus/${id}`);
            fetchBuses();
        } catch (err) { console.error(err); }
    };

    const handleDeleteRoute = async (id) => {
        if (!window.confirm("Are you sure you want to delete this bus route?")) return;
        try {
            const response = await axios.delete(`http://localhost:5000/api/busManagement/delete-bus-route/${id}`);
            if (response.status === 200) { fetchBusRoutes(); }
        } catch (err) { console.error("Failed to delete route:", err); }
    };

    return (
      <AdminLayout>
        <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-end mb-4 px-3">
                <div>
                    <h2 className="fw-bold text-dark mb-1">Bus Management</h2>
                    <p className="text-muted small mb-0">Monitor and organize your transport network</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary px-4 shadow-sm fw-bold" onClick={() => navigate('/add-bus')}>
                        <i className="bi bi-plus-lg me-2"></i>New Bus
                    </button>
                    <button className="btn btn-dark px-4 shadow-sm fw-bold" onClick={() => navigate('/add-bus-route')}>
                        <i className="bi bi-map me-2"></i>New Route
                    </button>
                </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="row px-3 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-4">
                        <span className="text-muted small text-uppercase fw-bold">Total Bus</span>
                        <h3 className="fw-bold text-primary mb-0">{buses.length}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-4">
                        <span className="text-muted small text-uppercase fw-bold">Active Routes</span>
                        <h3 className="fw-bold text-success mb-0">{busRoute.length}</h3>
                    </div>
                </div>
            </div>

            {/* --- FLEET TABLE --- */}
            <div className="card border-0 shadow-sm mx-3 mb-5 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Bus Details <span className="badge bg-light text-dark ms-2 fw-normal">Page {busPage}</span></h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="text-muted small">
                                <th className="ps-4">No</th>
                                <th>Code</th>
                                <th>Vehicle Name</th>
                                <th>Capacity Details</th>
                                <th>Plate No</th>
                                <th className="text-center">Operational Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentBuses.map((bus, index) => (
                                <tr key={bus.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                                    <td className="ps-4 text-muted">{indexOfFirstBus + index + 1}</td>
                                    <td><code className="text-primary fw-bold">{bus.bus_code}</code></td>
                                    <td className="fw-bold text-dark">{bus.bus_name}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <span className="badge bg-soft-blue text-primary border">💺 {bus.capacity_seat}</span>
                                            <span className="badge bg-soft-gray text-muted border">🧍 {bus.capacity_standing}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <code className="text-primary fw-bold">{bus.plate_no}</code>
                                    </td>
                                    <td className="text-center">
                                        <span className={`px-3 py-1 rounded-pill small fw-bold ${bus.deleted_at ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                                            {bus.deleted_at ? 'Inactive' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-light btn-sm me-2 rounded-3 border" title='Edit' onClick={() => navigate(`/admin-edit-bus-management/${bus.id}`)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm rounded-3" title='Deactivate' onClick={() => handleDelete(bus.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white border-0 py-3">
                    <div className="d-flex justify-content-center gap-1">
                        {[...Array(Math.ceil(buses.length / busPerPage))].map((_, i) => (
                            <button key={i} onClick={() => paginateBuses(i + 1)} className={`btn btn-sm rounded-circle ${busPage === i + 1 ? 'btn-primary px-3' : 'btn-light border text-muted'}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ROUTES TABLE --- */}
            <div className="card border-0 shadow-sm mx-3 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3">
                    <h5 className="mb-0 fw-bold text-success">Active Service Routes</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0">
                        <thead className="bg-light text-muted small">
                            <tr className='text-center'>
                                <th className="ps-4 text-start">No</th>
                                <th>Assign Bus</th>
                                <th>Origin Point</th>
                                <th>Destination Point</th>
                                <th>Day Assigned</th>
                                <th className="text-end pe-4">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRoutes.map((route, index) => (
                                <tr key={route.id} className="text-center">
                                    <td className="ps-4 text-start">{indexOfFirstRoute + index + 1}</td>
                                    <td><span className="badge bg-dark rounded-1">{route.bus_code}</span></td>
                                    <td>
                                        <div className="fw-bold">{route.depart_location}</div>
                                        <div className="small text-muted"><i className="bi bi-clock me-1"></i>{route.depart_time}</div>
                                    </td>
                                    <td>
                                        <div className="fw-bold">{route.arrive_location}</div>
                                        <div className="small text-muted"><i className="bi bi-clock me-1"></i>{route.arrive_time}</div>
                                    </td>
                                    <td>
                                        <span className="badge bg-primary rounded-1 px-3 py-2">{route.day_assigned}</span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-link text-secondary text-decoration-none fw-bold" onClick={() => navigate(`/admin-edit-bus-route-management/${route.id}`)}>
                                            <i className="bi bi-pencil me-1"></i>Edit
                                        </button>
                                        <button className="btn btn-sm btn-link text-danger text-decoration-none fw-bold" onClick={() => handleDeleteRoute(route.id)}>
                                            <i className="bi bi-x-circle me-1"></i>Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white border-0 py-3 text-center">
                    <div className="d-flex justify-content-center gap-1">
                        {[...Array(Math.ceil(busRoute.length / routePerPage))].map((_, i) => (
                            <button key={i} onClick={() => paginateRoutes(i + 1)} className={`btn btn-sm rounded-circle ${routePage === i + 1 ? 'btn-success px-3 text-white' : 'btn-light border'}`}>
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