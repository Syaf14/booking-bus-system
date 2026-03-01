import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

function BookingManagement() {
    const navigate = useNavigate();
    const [booking, setBooking] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            // Ensure your backend query joins with the schedule table to get day_assigned
            const response = await axios.get("http://localhost:5000/api/bookingManagement/get-booking-management");
            setBooking(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    // Filter logic for the search bar
    const filteredBookings = booking.filter(book => 
        book.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Booking Management</h2>
                        <p className="text-muted small mb-0">Track student reservations and seat allocations</p>
                    </div>
                    
                    <div className="d-flex shadow-sm rounded-3 overflow-hidden" style={{ width: '350px' }}>
                        <input 
                            type="text" 
                            className="form-control border-0 py-2 ps-3" 
                            placeholder="Search by student email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary px-3 border-0 rounded-0">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mx-3 rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-0 py-3">
                        <div className="d-flex align-items-center">
                            <div className="bg-warning bg-opacity-10 p-2 rounded-3 me-3">
                                <i className="bi bi-ticket-perforated text-warning"></i>
                            </div>
                            <h5 className="mb-0 fw-bold">Recent Reservations</h5>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr className="text-muted small text-uppercase">
                                    <th className="ps-4" style={{ width: "80px" }}>No</th>
                                    <th>Student Details</th>
                                    <th className="text-center">Day</th> {/* Added Column Header */}
                                    <th className="text-center">Bus Assigned</th>
                                    <th className="text-center">Seat Info</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredBookings.map((book, index) => (
                                    <tr key={book.id || index}>
                                        <td className="ps-4 fw-bold text-muted">{index + 1}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                                    <i className="bi bi-person text-secondary"></i>
                                                </div>
                                                <span className="fw-semibold">{book.email}</span>
                                            </div>
                                        </td>
                                        {/* Day Assigned Column */}
                                        <td className="text-center">
                                            <span className="text-capitalize badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-2">
                                                {book.day_assigned || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-dark rounded-1 px-3 py-2">
                                                <i className="bi bi-bus-front me-1"></i> {book.bus_code}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold">No. {book.seat_number}</span>
                                                <span className={`small text-uppercase fw-bold ${book.seat_type === 'standing' ? 'text-warning' : 'text-primary'}`} style={{fontSize: '0.7rem'}}>
                                                    {book.seat_type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group shadow-sm">
                                                <button className="btn btn-white btn-sm border" title="Edit Booking">
                                                    <i className="bi bi-pencil-square text-secondary"></i>
                                                </button>
                                                <button className="btn btn-white btn-sm border" title="View Details">
                                                    <i className="bi bi-eye-fill text-primary"></i>
                                                </button>
                                                <button className="btn btn-white btn-sm border" title="Cancel Booking">
                                                    <i className="bi bi-trash-fill text-danger"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                
                                {filteredBookings.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-5 text-center text-muted">
                                            <i className="bi bi-inbox display-6"></i>
                                            <p className="mt-2">No active bookings found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default BookingManagement;