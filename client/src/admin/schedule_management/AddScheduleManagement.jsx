import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../global/AdminLayout';

function AddScheduleManagement() {
    const navigate = useNavigate();
    const [busRoute, setBusRoute] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchRoutes(); }, []);

    const fetchRoutes = () => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/busManagement/get-available-bus-route`)
            .then(res => {
                setBusRoute(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // --- New Select All Logic ---
    const handleSelectAll = (data) => {
        const dataIds = data.map(r => r.id);
        const allSelected = dataIds.every(id => selectedIds.includes(id));

        if (allSelected) {
            // Deselect only the items in this specific table
            setSelectedIds(prev => prev.filter(id => !dataIds.includes(id)));
        } else {
            // Add all items from this table to selection, avoiding duplicates
            setSelectedIds(prev => [...new Set([...prev, ...dataIds])]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const idsToCreate = selectedIds.filter(id => 
            busRoute.find(r => r.id === id && r.schedule_status === null)
        );
        const idsToReactivate = selectedIds.filter(id => 
            busRoute.find(r => r.id === id && r.schedule_status === 'inactive')
        );

        try {
            const requests = [];
            if (idsToCreate.length > 0) {
                requests.push(axios.post("http://localhost:5000/api/scheduleManagement/add-schedule-bus", { route_ids: idsToCreate }));
            }
            if (idsToReactivate.length > 0) {
                requests.push(axios.post("http://localhost:5000/api/scheduleManagement/reactivate-schedule", { route_ids: idsToReactivate }));
            }
            await Promise.all(requests);
            alert("Deployment complete!");
            setSelectedIds([]);
            fetchRoutes();
        } catch (err) {
            alert("Failed to process request");
        }
    };

    const newRoutes = busRoute.filter(r => r.schedule_status === null);
    const inactiveRoutes = busRoute.filter(r => r.schedule_status === 'inactive');

    // --- Table Sub-Component ---
    const RouteTable = ({ data, title, icon, colorClass }) => {
        const isAllSelected = data.length > 0 && data.every(r => selectedIds.includes(r.id));

        return (
            <div className="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className={`${colorClass} bg-opacity-10 p-2 rounded-3 me-3`}>
                            <i className={`bi ${icon} ${colorClass.replace('bg-', 'text-')}`}></i>
                        </div>
                        <h5 className="mb-0 fw-bold">{title} ({data.length})</h5>
                    </div>
                    {data.length > 0 && (
                        <button 
                            type="button" 
                            className={`btn btn-sm ${isAllSelected ? 'btn-secondary' : 'btn-outline-primary'} fw-bold px-3`}
                            onClick={() => handleSelectAll(data)}
                        >
                            {isAllSelected ? 'Deselect Table' : 'Select All'}
                        </button>
                    )}
                </div>
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="small text-uppercase text-muted">
                                <th className="ps-4" style={{ width: '50px' }}>Select</th>
                                <th>Bus & Route</th>
                                <th>Timing</th>
                                <th className="text-end pe-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(route => (
                                <tr key={route.id} className="hover-row">
                                    <td className="ps-4">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input shadow-none"
                                            checked={selectedIds.includes(route.id)}
                                            onChange={() => toggleSelect(route.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="fw-bold text-dark">{route.bus_code}</div>
                                        <div className="small text-muted">{route.depart_location} → {route.arrive_location}</div>
                                    </td>
                                    <td>
                                        <div className="small fw-bold">{route.day_assigned}</div>
                                        <div className="small text-muted">{route.depart_time}</div>
                                    </td>
                                    <td className="text-end pe-4">
                                        <span className={`badge ${route.schedule_status ? 'bg-warning-subtle text-warning' : 'bg-info-subtle text-info'} rounded-pill`}>
                                            {route.schedule_status ? 'Inactive' : 'Ready to Deploy'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr><td colSpan="4" className="text-center py-5 text-muted">No routes available here.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Deploy Schedules</h2>
                        <p className="text-muted small mb-0">Manage new deployments and reactivate previous routes.</p>
                    </div>
                    <button className="btn btn-white border px-4 fw-bold shadow-sm" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left me-2"></i>Back
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <RouteTable 
                        data={newRoutes} 
                        title="New Available Routes" 
                        icon="bi-plus-circle-fill" 
                        colorClass="bg-primary" 
                    />

                    <RouteTable 
                        data={inactiveRoutes} 
                        title="Reactivate Previous Schedules" 
                        icon="bi-arrow-clockwise" 
                        colorClass="bg-warning" 
                    />

                    <div className="sticky-bottom bg-white p-3 border-top shadow-lg d-flex justify-content-between align-items-center rounded-top-4 mx-n3">
                        <div className="ps-3">
                            <span className="h5 fw-bold text-primary mb-0">{selectedIds.length}</span>
                            <span className="text-muted small ms-2">Route(s) selected for deployment</span>
                        </div>
                        <div className="pe-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary px-5 py-2 fw-bold rounded-3 shadow-sm" 
                                disabled={selectedIds.length === 0}
                            >
                                <i className="bi bi-lightning-fill me-2"></i>Confirm & Deploy
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

export default AddScheduleManagement;