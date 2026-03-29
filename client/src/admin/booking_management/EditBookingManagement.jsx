import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../global/AdminLayout';

function EditBookingManagement() {
    const { id } = useParams(); // Grabs the ID from /edit-booking/:id
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        status: '',
        seat_number: '',
        seat_type: 'seated'
    });

    // 1. Fetch the specific booking data by ID
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                setLoading(true);
                // Matches the backend route: /get-booking/:id
                const response = await axios.get(`http://localhost:5000/api/bookingManagement/get-booking-by-id/${id}`);
                
                const data = response.data;
                setFormData({
                    email: data.email,
                    status: data.status,
                    seat_number: data.seat_number,
                    seat_type: data.seat_type || 'seated'
                });
            } catch (err) {
                console.error("Error fetching booking:", err);
                alert("Failed to load booking details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBookingData();
    }, [id]);

    // 2. Handle the Save/Update action
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/bookingManagement/update-booking/${id}`, formData);
            alert("Booking Updated Successfully!");
            navigate('/booking-management');
        } catch (err) {
            console.error("Update error:", err);
            alert(err.response?.data?.message || "Failed to update booking");
        }
    };

    if (loading) return <AdminLayout><div className="p-5 text-center">Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <h4 className="fw-bold text-dark">Modify Reservation</h4>
                                <p className="text-muted small">Update details for Booking #{id}</p>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleUpdate}>
                                    
                                    {/* Student Email (Read Only - fetched from DB) */}
                                    <div className="mb-4">
                                        <label className="form-label text-muted small fw-bold">Student Email</label>
                                        <input 
                                            type="text" 
                                            className="form-control bg-light border-0" 
                                            value={formData.email} 
                                            readOnly 
                                        />
                                    </div>

                                    <div className="row">
                                        {/* Status Selection */}
                                        <div className="col-md-12 mb-4">
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

                                        {/* Seat Number */}
                                        <div className="col-md-6 mb-4">
                                            <label className="form-label text-muted small fw-bold">Seat Number</label>
                                            <input 
                                                type="text" 
                                                className="form-control border-2" 
                                                value={formData.seat_number}
                                                onChange={(e) => setFormData({...formData, seat_number: e.target.value})}
                                            />
                                        </div>

                                        {/* Seat Type */}
                                        <div className="col-md-6 mb-4">
                                            <label className="form-label text-muted small fw-bold">Seat Type</label>
                                            <div className="d-flex gap-2">
                                                <input 
                                                    type="radio" className="btn-check" name="seatType" id="seated" 
                                                    checked={formData.seat_type === 'seated' || formData.seat_type === 'normal'}
                                                    onChange={() => setFormData({...formData, seat_type: 'normal'})}
                                                />
                                                <label className="btn btn-outline-primary w-100" htmlFor="seated">Seated</label>

                                                <input 
                                                    type="radio" className="btn-check" name="seatType" id="standing" 
                                                    checked={formData.seat_type === 'standing'}
                                                    onChange={() => setFormData({...formData, seat_type: 'standing'})}
                                                />
                                                <label className="btn btn-outline-warning w-100" htmlFor="standing">Standing</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 mt-4">
                                        <button type="submit" className="btn btn-primary px-4 py-2 fw-bold flex-grow-1 rounded-3 shadow-sm">
                                            Save Changes
                                        </button>
                                        <button type="button" className="btn btn-light px-4 py-2 fw-bold rounded-3" onClick={() => navigate(-1)}>
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