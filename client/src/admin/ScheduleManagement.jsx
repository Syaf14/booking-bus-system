import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

function ScheduleManagement() {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);
    
    // --- Filter State ---
    const [busCodeFilter, setBusCodeFilter] = useState('');
    const [dayFilter, setDayFilter] = useState('');

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 15;

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/scheduleManagement/get-all-schedule-bus");
            setSchedule(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this schedule?")) return;
        try {
            await axios.delete(`http://localhost:3001/api/scheduleManagement/delete-schedule-bus/${id}`);
            fetchSchedule();
        } catch (err) { console.error(err); }
    };

    // --- Filter & Pagination Logic ---
    // 1. Filter the data first
    const filteredRecords = schedule.filter(item => {
        const matchesBus = item.bus_code.toLowerCase().includes(busCodeFilter.toLowerCase());
        const matchesDay = dayFilter === '' || item.day_assigned === dayFilter;
        return matchesBus && matchesDay;
    });

    // 2. Paginate the filtered results
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredRecords.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredRecords.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const prePage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    const changeCPage = (id) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage !== npage) setCurrentPage(currentPage + 1);
    }

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-end mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Schedule Management</h2>
                        <p className="text-muted small mb-0">Coordinate bus timings and operational windows</p>
                    </div>
                    <div>
                        <button className="btn btn-primary px-4 shadow-sm fw-bold" onClick={() => navigate('/add-schedule-bus')}>
                            <i className="bi bi-calendar-plus me-2"></i>Add Schedule
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="card border-0 shadow-sm mx-3 rounded-4 mb-4">
                    <div className="card-body p-3">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label small fw-bold text-muted">Search Bus Code</label>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
                                    <input 
                                        type="text" 
                                        className="form-control border-start-0" 
                                        placeholder="e.g. BUK1234"
                                        value={busCodeFilter}
                                        onChange={(e) => {setBusCodeFilter(e.target.value); setCurrentPage(1);}}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-muted">Filter by Day</label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={dayFilter}
                                    onChange={(e) => {setDayFilter(e.target.value); setCurrentPage(1);}}
                                >
                                    <option value="">Semua Hari (All Days)</option>
                                    <option value="isnin">Isnin</option>
                                    <option value="selasa">Selasa</option>
                                    <option value="rabu">Rabu</option>
                                    <option value="khamis">Khamis</option>
                                    <option value="jumaat">Jumaat</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Table Card */}
                <div className="card border-0 shadow-sm mx-3 rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-0 py-3">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                                <i className="bi bi-clock-history text-primary"></i>
                            </div>
                            <h5 className="mb-0 fw-bold">Active Timetables</h5>
                        </div>
                    </div>
                    
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle mb-0">
                            <thead className="bg-light">
                                <tr className="text-muted small text-uppercase">
                                    <th className="ps-4" style={{ width: "60px" }}>No</th>
                                    <th>Route Path</th>
                                    <th className="text-center">Day</th>
                                    <th className="text-center">Departure</th>
                                    <th className="text-center">Arrival</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {currentRecords.map((item, index) => (
                                    <tr key={item.id} className="hover-row">
                                        <td className="ps-4 fw-bold text-muted">{firstIndex + index + 1}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="fw-bold text-dark">{item.depart_location}</span>
                                                <i className="bi bi-arrow-right mx-2 text-primary"></i>
                                                <span className="fw-bold text-dark">{item.arrive_location}</span>
                                                <span className='mx-2'>||</span>
                                                <span className='fw-bold text-dark'>{item.bus_code}</span>
                                            </div>
                                        </td>
                                        <td className='text-center'>
                                            <span className='badge bg-primary text-white'>{item.day_assigned}</span>
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-light text-primary border px-3 py-2 rounded-3">
                                                <i className="bi bi-door-open me-1"></i> {item.depart_time}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-light text-success border px-3 py-2 rounded-3">
                                                <i className="bi bi-door-closed me-1"></i> {item.arrive_time}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge ${item.status === 'active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'} rounded-pill px-3`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            {item.status === 'active' && (
                                                <div className="btn-group shadow-sm rounded-3 overflow-hidden">
                                                    <button className="btn btn-white btn-sm border-end px-3" onClick={() => navigate(`/detail-schedule-management/${item.id}`)}>
                                                        <i className="bi bi-info-circle-fill text-primary"></i>
                                                    </button>
                                                    <button className="btn btn-white btn-sm px-3" title="Deactivate" onClick={() => handleDelete(item.id)}>
                                                        <i className="bi bi-eye-slash text-danger"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {filteredRecords.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="py-5 text-center">
                                            <div className="text-muted">
                                                <i className="bi bi-search display-4"></i>
                                                <p className="mt-2">No matching schedules found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Footer */}
                    {filteredRecords.length > 0 && (
                        <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                                Showing {firstIndex + 1} to {Math.min(lastIndex, filteredRecords.length)} of {filteredRecords.length} entries
                            </small>
                            <nav>
                                <ul className="pagination pagination-sm mb-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={prePage}>Previous</button>
                                    </li>
                                    {numbers.map((n, i) => (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <button className="page-link" onClick={() => changeCPage(n)}>{n}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={nextPage}>Next</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default ScheduleManagement;