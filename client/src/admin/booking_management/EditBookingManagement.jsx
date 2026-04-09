import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../global/AdminLayout';

function EditBookingManagement() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [seats, setSeats] = useState([]); // Store available seats
    const [formData, setFormData] = useState({
        email: '',
        status: '',
        seat_id: '', // Store the ID now, not just the number
        seat_type: 'seated'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // 1. Fetch Booking Details
                const bookingRes = await axios.get(`http://localhost:3001/api/bookingManagement/get-booking-by-id/${id}`);
                const bData = bookingRes.data;

                // 2. Fetch All Available Seats
                const seatsRes = await axios.get(`http://localhost:3001/api/busManagement/get-bus-seat/`);
                setSeats(seatsRes.data);

                setFormData({
                    email: bData.email,
                    status: bData.status,
                    seat_id: bData.seat_id, // Map the seat_id from the booking
                    seat_type: bData.seat_type || 'seated'
                });
            } catch (err) {
                console.error("Error fetching data:", err);
                alert("Failed to load details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Sending seat_id and status to the backend
            await axios.put(`http://localhost:3001/api/bookingManagement/update-booking/${id}`, {
                status: formData.status,
                seat_id: formData.seat_id
            });
            alert("Booking Updated Successfully!");
            navigate('/admin-booking-management');
        } catch (err) {
            console.error("Update error:", err);
            alert(err.response?.data?.message || "Failed to update booking");
        }
    };

    if (loading) return <AdminLayout><div className="p-5 text-center">Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="container-fluid py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <h4 className="fw-bold text-dark">Modify Reservation</h4>
                                <p className="text-muted small">Update details for Booking #{id}</p>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleUpdate}>
                                    
                                    <div className="mb-4">
                                        <label className="form-label text-muted small fw-bold">Student Email</label>
                                        <input type="text" className="form-control bg-light border-0" value={formData.email} readOnly />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-muted small fw-bold">Booking Status</label>
                                        <select 
                                            className="form-select border-2" 
                                            value={formData.status}
                                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        >
                                            <option value="confirmed">Confirmed</option>
                                            <option value="pending">Pending</option>
                                            <option value="expired">Expired</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-muted small fw-bold">Assign Seat</label>
                                        <select 
                                            className="form-select border-2" 
                                            value={formData.seat_id}
                                            onChange={(e) => setFormData({...formData, seat_id: e.target.value})}
                                            required
                                        >
                                            <option value="">-- Select a Seat --</option>
                                            {seats.map(seat => (
                                                <option key={seat.id} value={seat.id}>
                                                    {seat.seat_number} ({seat.seat_type})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-flex gap-2 mt-4">
                                        <button type="submit" className="btn btn-primary px-4 py-2 fw-bold flex-grow-1">
                                            Save Changes
                                        </button>
                                        <button type="button" className="btn btn-light px-4 py-2" onClick={() => navigate(-1)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default EditBookingManagement;