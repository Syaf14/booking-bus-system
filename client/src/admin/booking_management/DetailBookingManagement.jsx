import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../global/AdminLayout';

function DetailBookingManagement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        // Replace with your actual fetch logic
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/bookingManagement/get-booking-by-id/${id}`);
                setBooking(res.data);
            } catch (err) { console.error(err); }
        };
        fetchDetail();
    }, [id]);

    if (!booking) return <AdminLayout><div className="p-5 text-center">Loading reservation...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="d-flex align-items-center mb-4 px-3">
                    <button className="btn btn-white shadow-sm rounded-3 me-3" onClick={() => navigate(-1)}>
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <h3 className="fw-bold mb-0">Booking Information</h3>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Status Banner */}
                        <div className={`card border-0 shadow-sm mb-4 rounded-4 bg-${booking.status === 'confirmed' ? 'success' : 'warning'} bg-opacity-10`}>
                            <div className="card-body d-flex justify-content-between align-items-center py-3">
                                <span className={`fw-bold text-${booking.status === 'confirmed' ? 'success' : 'dark'}`}>
                                    <i className="bi bi-info-circle me-2"></i>
                                    This reservation is {booking.status.toUpperCase()}
                                </span>
                                <small className="text-muted">Booking ID: #{id}</small>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="row g-0">
                                {/* Left Side: Student Info */}
                                <div className="col-md-5 bg-primary bg-opacity-10 p-4 border-end border-light">
                                    <div className="text-center mb-4">
                                        <div className="bg-white rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                            <i className="bi bi-person-fill text-primary display-6"></i>
                                        </div>
                                        <h5 className="fw-bold mb-0">{booking.email}</h5>
                                        <p className="text-muted small">Student Account</p>
                                    </div>
                                    <hr className="opacity-25" />
                                    <div className="mt-4">
                                        <label className="small text-muted d-block">Reservation Date</label>
                                        <p className="fw-bold">March 23, 2026</p>
                                        
                                        <label className="small text-muted d-block">Seat Selection</label>
                                        <p className="fw-bold text-primary">Seat No. {booking.seat_number} ({booking.seat_type})</p>
                                    </div>
                                </div>

                                {/* Right Side: Trip Details */}
                                <div className="col-md-7 p-4 bg-white">
                                    <h6 className="text-uppercase text-muted fw-bold small mb-4">Trip Itinerary</h6>
                                    
                                    <div className="position-relative ps-4 border-start border-2 border-primary border-opacity-25 mb-5">
                                        <div className="mb-4">
                                            <i className="bi bi-geo-alt-fill text-primary position-absolute start-0 translate-middle-x bg-white" style={{marginTop: '-2px'}}></i>
                                            <label className="small text-muted d-block">Origin</label>
                                            <span className="fw-bold">{booking.depart_location}</span>
                                            <div className="small text-primary">{booking.depart_time}</div>
                                        </div>
                                        
                                        <div>
                                            <i className="bi bi-geo-fill text-success position-absolute start-0 translate-middle-x bg-white" style={{bottom: '0'}}></i>
                                            <label className="small text-muted d-block">Destination</label>
                                            <span className="fw-bold">{booking.arrive_location}</span>
                                            <div className="small text-success">{booking.arrive_time}</div>
                                        </div>
                                    </div>

                                    <div className="row bg-light rounded-3 p-3 g-2">
                                        <div className="col-6">
                                            <small className="text-muted d-block">Bus Code</small>
                                            <span className="fw-bold"><i className="bi bi-bus-front me-1"></i> {booking.bus_code}</span>
                                        </div>
                                        <div className="col-6 text-end">
                                            <small className="text-muted d-block">Scheduled Day</small>
                                            <span className="badge bg-dark">{booking.day_assigned}</span>
                                        </div>
                                    </div>

                                    <div className="mt-5 d-flex gap-2">
                                        <button className="btn btn-primary flex-grow-1" onClick={() => navigate(`/admin-edit-booking-management/${id}`)}>
                                            Modify Reservation
                                        </button>
                                        <button className="btn btn-outline-danger px-4" onClick={() => navigate(`/admin-booking-management`)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default DetailBookingManagement;