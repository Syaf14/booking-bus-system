import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../global/AdminLayout'
import axios from 'axios';

function BusManagement() {
    const navigate = useNavigate();
    const [buses, setBuses] = useState([]);
    const [busRoute, setBusRoute] = useState([]);

    // --- Search & Filter State ---
    const [busSearch, setBusSearch] = useState("");
    const [busStatusFilter, setBusStatusFilter] = useState("all");
    const [routeDayFilter, setRouteDayFilter] = useState("all");

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

    // --- Filter Logic ---
    const filteredBuses = buses.filter(bus => {
        const matchesCode = bus.bus_code.toLowerCase().includes(busSearch.toLowerCase());
        const status = bus.deleted_at ? "inactive" : "active";
        const matchesStatus = busStatusFilter === "all" || status === busStatusFilter;
        return matchesCode && matchesStatus;
    });

    const filteredRoutes = busRoute.filter(route => {
        // If route.day_assigned in your DB is already 'Isnin', 'Selasa', etc.
        return routeDayFilter === "all" || route.day_assigned === routeDayFilter;
    });

    // --- Pagination Logic (Applied to filtered results) ---
    const indexOfLastBus = busPage * busPerPage;
    const indexOfFirstBus = indexOfLastBus - busPerPage;
    const currentBuses = filteredBuses.slice(indexOfFirstBus, indexOfLastBus);

    const indexOfLastRoute = routePage * routePerPage;
    const indexOfFirstRoute = indexOfLastRoute - routePerPage;
    const currentRoutes = filteredRoutes.slice(indexOfFirstRoute, indexOfLastRoute);

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

            {/* --- FLEET TABLE --- */}
            <div className="card border-0 shadow-sm mx-3 mb-5 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <h5 className="mb-0 fw-bold">Bus Details</h5>
                    <div className="d-flex gap-2">
                        {/* Status Filter */}
                        <select className="form-select form-select-sm border-0 bg-light" style={{width: '130px'}} 
                            value={busStatusFilter} onChange={(e) => {setBusStatusFilter(e.target.value); setBusPage(1);}}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {/* Search Bus Code */}
                        <div className="input-group input-group-sm" style={{width: '200px'}}>
                            <span className="input-group-text bg-light border-0"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control border-0 bg-light" placeholder="Bus Code..." 
                                value={busSearch} onChange={(e) => {setBusSearch(e.target.value); setBusPage(1);}} />
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="text-muted small">
                                <th className="ps-4">No</th>
                                <th>Code</th>
                                <th>Vehicle Name</th>
                                <th>Capacity</th>
                                <th>Plate No</th>
                                <th className="text-center">Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentBuses.map((bus, index) => (
                                <tr key={bus.id}>
                                    <td className="ps-4 text-muted">{indexOfFirstBus + index + 1}</td>
                                    <td><code className="text-primary fw-bold">{bus.bus_code}</code></td>
                                    <td className="fw-bold text-dark">{bus.bus_name}</td>
                                    <td>
                                        <div className="d-flex gap-2 small">
                                            <span className="badge bg-light text-primary border">💺 {bus.capacity_seat}</span>
                                            <span className="badge bg-light text-muted border">🧍 {bus.capacity_standing}</span>
                                        </div>
                                    </td>
                                    <td><code className="text-dark fw-bold">{bus.plate_no}</code></td>
                                    <td className="text-center">
                                        <span className={`px-3 py-1 rounded-pill small fw-bold ${bus.deleted_at ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                                            {bus.deleted_at ? 'Inactive' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-light btn-sm me-2 rounded-3 border" onClick={() => navigate(`/admin-edit-bus-management/${bus.id}`)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm rounded-3" onClick={() => handleDelete(bus.id)}>
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
                        {[...Array(Math.ceil(filteredBuses.length / busPerPage))].map((_, i) => (
                            <button key={i} onClick={() => paginateBuses(i + 1)} className={`btn btn-sm rounded-circle ${busPage === i + 1 ? 'btn-primary px-3' : 'btn-light border text-muted'}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ROUTES TABLE --- */}
            <div className="card border-0 shadow-sm mx-3 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-success">Active Bus Routes</h5>
                    
                    <select 
                        className="form-select form-select-sm border-0 bg-light" 
                        style={{ width: '160px' }} 
                        value={routeDayFilter} 
                        onChange={(e) => { setRouteDayFilter(e.target.value); setRoutePage(1); }}
                    >
                        <option value="all">Semua Hari</option>
                        <option value="isnin">Isnin</option>
                        <option value="selasa">Selasa</option>
                        <option value="rabu">Rabu</option>
                        <option value="khamis">Khamis</option>
                        <option value="jumaat">Jumaat</option>
                        <option value="sabtu">Sabtu</option>
                        <option value="ahad">Ahad</option>
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
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
                        {[...Array(Math.ceil(filteredRoutes.length / routePerPage))].map((_, i) => (
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