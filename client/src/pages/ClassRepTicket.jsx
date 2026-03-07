import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '../global/UserLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ClassRepTicket() {
  const { id } = useParams(); // This is the user ID from the URL
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTickets = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookingManagement/get-ticket/${id}`);
      setTickets(response.data);
    } catch (err) {
      console.error("Error loading tickets:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchMyTickets();
  }, [id, fetchMyTickets]);

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      // Pastikan endpoint delete menggunakan ID booking yang benar
      const response = await axios.delete(`http://localhost:5000/api/bookingManagement/delete-booking/${id}`);
      if (response.status === 200) { 
        // 2. Sekarang fetchMyTickets sudah bisa dipanggil di sini
        fetchMyTickets(); 
      }
    } catch (err) { 
      console.error("Failed to delete booking:", err); 
    }
  }

  if (loading) return <UserLayout><div className="text-center mt-5">Loading your tickets...</div></UserLayout>;

  return (
    <UserLayout>
      <div className="container py-4">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold text-dark mb-1">My Bookings</h4>
            <p className="text-muted small">Real-time status of your reserved seats.</p>
          </div>
          <span className="badge bg-primary rounded-pill">{tickets.length} Tickets</span>
        </div>

        <div className="row">
          {tickets.map((ticket, index) => (
            <div className="col-12 mb-3" key={index}>
              <div className="card border-0 shadow-sm p-0 overflow-hidden" style={{ borderRadius: "15px" }}>
                <div className="row g-0">
                  {/* Left Side Accent */}
                  <div className="col-auto bg-primary" style={{ width: "6px" }}></div>
                  
                  <div className="col p-3">
                    <div className="row align-items-center">
                      {/* Bus Info */}
                      <div className="col-md-3 border-end">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-bus-front text-primary fs-4 me-2"></i>
                          <span className="fw-bold text-dark">{ticket.bus_name}</span>
                        </div>
                        <p className="text-muted extra-small mb-0">REF: #{ticket.booking_id}</p>
                        <p className="text-muted extra-small mb-0">Plate: {ticket.plateNo}</p>
                      </div>

                      {/* Route */}
                      <div className="col-md-5 px-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text-center">
                            <span className="d-block small text-uppercase text-muted">From</span>
                            <span className="fw-bold">{ticket.from}</span>
                          </div>
                          <div className="text-primary mx-2 d-flex flex-column align-items-center">
                             <i className="bi bi-arrow-right-circle-fill fs-4"></i>
                          </div>
                          <div className="text-center">
                            <span className="d-block small text-uppercase text-muted">To</span>
                            <span className="fw-bold">{ticket.to}</span>
                          </div>
                        </div>
                      </div>

                      {/* Schedule */}
                      <div className="col-md-2 border-start text-center">
                        <span className="d-block small text-muted">Departure</span>
                        <div className="fw-bold">{ticket.day_assigned}</div>
                        <div className="small text-secondary">{ticket.depart_time}</div>
                      </div>

                      {/* Seat & Status */}
                      <div className="col-md-2 text-end pe-4">
                        <div className="mb-1">
                           <span className="small text-muted me-2">Seat:</span>
                           <span className="fw-bold fs-5 text-primary">{ticket.seat}</span>
                        </div>
                        <div className='mb-1'>
                          <span className={`badge rounded-pill ${ticket.status === 'confirmed' ? 'bg-success' : 'bg-warning'} px-3 py-2`}>
                            {ticket.status.toUpperCase()}
                          </span>
                        </div>
                        <a onClick={() => handleDeleteBooking(ticket.booking_id)} className='btn btn-danger rounded-pill px-4'>Cancel</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {tickets.length === 0 && (
          <div className="card border-0 shadow-sm p-5 text-center mt-4">
            <i className="bi bi-ticket-detailed text-light" style={{fontSize: "5rem"}}></i>
            <h5 className="mt-3 text-dark">No active tickets found</h5>
            <p className="text-muted">Head back to home to book a trip.</p>
            <button className="btn btn-primary mt-3 px-4 rounded-pill" onClick={() => window.history.back()}>Book Now</button>
          </div>
        )}
      </div>

      <style>{`
        .extra-small { font-size: 0.75rem; }
      `}</style>
    </UserLayout>
  )
}

export default ClassRepTicket;