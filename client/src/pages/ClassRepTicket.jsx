import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '../global/UserLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ClassRepTicket() {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

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

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Cancel your personal seat for this trip?")) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/bookingManagement/delete-booking/${bookingId}`);
      if (response.status === 200) fetchMyTickets();
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  }

  const handleDeleteClassBooking = async (ticket) => {
    const confirmMessage = `CRITICAL ACTION: This will cancel ALL class bookings for ${ticket.bus_name} on ${ticket.day_assigned}. This cannot be undone. Proceed?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/bookingManagement/class-booking-delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { scheduled_id: ticket.scheduled_id, class_id: ticket.class_id }
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        fetchMyTickets();
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to cancel class trip"));
    }
  };

  const filteredTickets = tickets.filter(t => filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase());

  if (loading) return <UserLayout><div className="text-center mt-5"><div className="spinner-border text-primary"></div></div></UserLayout>;

  return (
    <UserLayout>
      <div className="container py-4">
        {/* Header with Admin Indicator */}
        <div className="mb-4 d-flex justify-content-between align-items-end">
          <div>
            <h4 className="fw-bold text-dark mb-1">Representative Dashboard</h4>
            <p className="text-muted small mb-0"><i className="bi bi-shield-check text-primary"></i> You are managing tickets for your class group.</p>
          </div>
          <div className="text-end">
             <span className="badge bg-primary rounded-pill px-3 py-2 shadow-sm">{filteredTickets.length} active records</span>
          </div>
        </div>

        {/* Status Filters */}
        <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
          {['all', 'confirmed', 'pending', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`btn btn-sm rounded-pill px-4 text-uppercase fw-bold ${
                filterStatus === status ? 'btn-dark shadow-sm' : 'btn-light border text-muted'
              }`}
              style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="row">
          {filteredTickets.map((ticket, index) => {
            const isClassTrip = ticket.booking_type?.toLowerCase() === 'class';
            
            return (
              <div className="col-12 mb-4" key={index}>
                <div className={`card border-0 shadow-sm overflow-hidden ticket-card ${ticket.status === 'cancelled' ? 'opacity-50' : ''}`}>
                  <div className="row g-0 h-100">
                    
                    {/* LEFT SECTION (The Info) */}
                    <div className="col-md-8 p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span className="badge bg-dark text-white rounded-2 px-2 py-1" style={{fontSize: '0.7rem'}}>{ticket.bus_code}</span>
                          
                          {/* Booking Type Badge */}
                          <span className={`badge border rounded-2 px-2 py-1 ${isClassTrip ? 'bg-warning-subtle text-warning-emphasis border-warning-subtle' : 'bg-info-subtle text-info-emphasis border-info-subtle'}`} style={{fontSize: '0.7rem'}}>
                            <i className={`bi ${isClassTrip ? 'bi-mortarboard' : 'bi-person'}`}></i> {ticket.booking_type || 'Normal'}
                          </span>

                          <span className="text-muted extra-small font-monospace">#REF-{ticket.booking_id}</span>
                        </div>
                        <span className={`badge rounded-pill px-3 py-1 text-uppercase ${ticket.status === 'confirmed' ? 'bg-success' : 'bg-danger'}`} style={{fontSize: '0.6rem'}}>
                          {ticket.status}
                        </span>
                      </div>

                      <h3 className="fw-bold mb-4">{ticket.bus_name}</h3>

                      <div className="row align-items-center mb-4">
                        <div className="col-5">
                          <label className="text-muted extra-small text-uppercase fw-bold d-block mb-1">Departure</label>
                          <span className="fw-bold text-primary">{ticket.from}</span>
                        </div>
                        <div className="col-2 text-center">
                          <i className="bi bi-arrow-right text-muted"></i>
                        </div>
                        <div className="col-5 text-end">
                          <label className="text-muted extra-small text-uppercase fw-bold d-block mb-1">Arrival</label>
                          <span className="fw-bold text-primary">{ticket.to}</span>
                        </div>
                      </div>

                      <div className="d-flex gap-4">
                        <div>
                          <label className="text-muted extra-small text-uppercase d-block mb-0">Date</label>
                          <small className="fw-bold">{ticket.day_assigned}</small>
                        </div>
                        <div>
                          <label className="text-muted extra-small text-uppercase d-block mb-0">Time</label>
                          <small className="fw-bold">{ticket.depart_time}</small>
                        </div>
                        <div>
                          <label className="text-muted extra-small text-uppercase d-block mb-0">Vehicle</label>
                          <small className="fw-bold">{ticket.plateNo}</small>
                        </div>
                      </div>
                    </div>

                    {/* PERFORATION DIVIDER */}
                    <div className="col-auto d-none d-md-flex flex-column justify-content-between py-3">
                        <div className="notch-top"></div>
                        <div className="ticket-line"></div>
                        <div className="notch-bottom"></div>
                    </div>

                    {/* RIGHT SECTION (The Controls) */}
                    <div className="col-md-3 bg-light p-4 d-flex flex-column justify-content-center align-items-center border-start-dashed">
                      <div className="mb-4 text-center">
                        <p className="text-muted extra-small text-uppercase mb-1">Your Seat</p>
                        <h1 className="fw-black text-primary mb-0" style={{fontSize: '3.5rem'}}>{ticket.seat}</h1>
                      </div>

                      {ticket.status !== 'cancelled' && (
                        <div className="w-100 d-grid gap-2">
                           <button onClick={() => handleDeleteBooking(ticket.booking_id)} className="btn btn-outline-dark btn-sm rounded-pill py-2">
                             Cancel My Seat
                           </button>
                           
                           {/* Highlight the Class-wide cancel button for Reps */}
                           {isClassTrip && (
                             <button onClick={() => handleDeleteClassBooking(ticket)} className="btn btn-danger btn-sm rounded-pill py-2 shadow-sm fw-bold">
                               <i className="bi bi-exclamation-triangle-fill me-1"></i> Cancel Trip (All)
                             </button>
                           )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-ticket-perforated text-light display-1"></i>
            <h4 className="text-muted mt-3">No matching records found</h4>
          </div>
        )}
      </div>

      <style>{`
        .ticket-card {
          border-radius: 20px;
          background: #fff;
          transition: transform 0.2s;
        }
        .ticket-card:hover { transform: translateY(-3px); }
        .extra-small { font-size: 0.65rem; letter-spacing: 0.5px; }
        .border-start-dashed { border-left: 2px dashed #eee; }
        
        /* Perforation Styling */
        .notch-top, .notch-bottom {
          width: 30px;
          height: 15px;
          background-color: #f8f9fa; /* Match container background */
          margin-left: -15px;
        }
        .notch-top { border-radius: 0 0 50px 50px; margin-top: -30px; border: 1px solid #eee; border-top: 0; }
        .notch-bottom { border-radius: 50px 50px 0 0; margin-bottom: -30px; border: 1px solid #eee; border-bottom: 0; }
        .ticket-line {
          flex-grow: 1;
          border-left: 2px dashed #dee2e6;
          margin-left: -1px;
        }
        .fw-black { font-weight: 900; }
      `}</style>
    </UserLayout>
  )
}

export default ClassRepTicket;