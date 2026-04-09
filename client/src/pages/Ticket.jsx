import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '../global/UserLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Ticket() {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); 

  const fetchMyTickets = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/bookingManagement/get-ticket/${id}`);
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
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const response = await axios.delete(`http://localhost:3001/api/bookingManagement/delete-booking/${bookingId}`);
      if (response.status === 200) { 
        fetchMyTickets(); 
      }
    } catch (err) { 
      console.error("Failed to delete booking:", err); 
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    // If 'all' is selected, only show tickets with 'confirmed' status
    if (filterStatus === 'all') {
      return ticket.status.toLowerCase() === 'confirmed';
    }
    
    // For other filters (pending, cancelled), show exactly that status
    return ticket.status.toLowerCase() === filterStatus.toLowerCase();
  });

  if (loading) return <UserLayout><div className="text-center mt-5">Loading your tickets...</div></UserLayout>;

  return (
    <UserLayout>
      <div className="container py-4">
        {/* Header Section */}
        <div className="mb-4 d-flex justify-content-between align-items-end">
          <div>
            <h4 className="fw-bold text-dark mb-1">My Bookings</h4>
            <p className="text-muted small mb-0">Track your class and normal bus trips.</p>
          </div>
          <span className="badge bg-primary rounded-pill px-3 py-2 shadow-sm">{filteredTickets.length} Found</span>
        </div>

        {/* Filter Navigation Bar */}
        <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
          {['all', 'pending', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`btn btn-sm rounded-pill px-4 text-uppercase fw-bold ${
                filterStatus === status ? 'btn-primary shadow-sm' : 'btn-light border text-muted'
              }`}
              style={{ fontSize: '0.7rem', letterSpacing: '0.5px', transition: 'all 0.3s' }}
            >
              {/* If status is 'all', show 'ACTIVE', otherwise show the status name */}
              {status === 'all' ? 'Active / Confirmed' : status}
            </button>
          ))}
        </div>

        <div className="row">
          {filteredTickets.map((ticket, index) => {
            // Logic for Booking Type Badge Styling
            const isClass = ticket.booking_type?.toLowerCase() === 'class';
            
            return (
              <div className="col-12 mb-4" key={index}>
                <div className={`card border-0 shadow-sm overflow-hidden transition-hover ${ticket.status === 'cancelled' ? 'opacity-75' : ''}`} 
                    style={{ borderRadius: "20px", minHeight: "220px", background: "#fff" }}>
                  <div className="row g-0 h-100">
                    
                    {/* LEFT SECTION */}
                    <div className="col-md-8 p-4 d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                            {/* Bus Code Badge */}
                            <span className="badge bg-dark text-white px-3 py-2 rounded-3" style={{ fontSize: '0.7rem' }}>
                              {ticket.bus_code}
                            </span>

                            {/* DYNAMIC BOOKING TYPE BADGE */}
                            <span className={`badge border px-3 py-2 rounded-3 d-flex align-items-center gap-1 ${
                              isClass 
                              ? 'bg-warning-subtle text-warning-emphasis border-warning-subtle' 
                              : 'bg-info-subtle text-info-emphasis border-info-subtle'
                            }`} style={{ fontSize: '0.7rem' }}>
                              <i className={`bi ${isClass ? 'bi-mortarboard-fill' : 'bi-person-fill'}`}></i>
                              {ticket.booking_type || 'Normal'}
                            </span>

                            <span className="text-muted extra-small">REF: #TICK-{ticket.booking_id}</span>
                          </div>
                          <h3 className="fw-bold text-dark mb-0">{ticket.bus_name}</h3>
                        </div>
                        <div className="text-end">
                          <span className={`badge rounded-pill px-3 py-2 text-uppercase ${
                            ticket.status === 'confirmed' ? 'bg-success' : 
                            ticket.status === 'cancelled' ? 'bg-danger' : 'bg-warning'
                          }`} style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>

                      {/* Route visualization */}
                      <div className="row align-items-center my-3">
                        <div className="col-5">
                          <p className="text-muted extra-small text-uppercase mb-1 fw-bold">From</p>
                          <h5 className="fw-bolder mb-0 text-truncate">{ticket.from}</h5>
                        </div>
                        <div className="col-2 text-center px-0">
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="flex-grow-1 border-bottom border-2 opacity-25"></div>
                            <i className="bi bi-chevron-right text-primary mx-1"></i>
                            <div className="flex-grow-1 border-bottom border-2 opacity-25"></div>
                          </div>
                        </div>
                        <div className="col-5 text-end">
                          <p className="text-muted extra-small text-uppercase mb-1 fw-bold">To</p>
                          <h5 className="fw-bolder mb-0 text-truncate">{ticket.to}</h5>
                        </div>
                      </div>

                      <div className="d-flex gap-4 mt-2">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-calendar3 text-muted"></i>
                          <div>
                            <p className="text-muted extra-small text-uppercase mb-0">Date</p>
                            <p className="fw-bold mb-0 small">{ticket.day_assigned}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-clock text-muted"></i>
                          <div>
                            <p className="text-muted extra-small text-uppercase mb-0">Time</p>
                            <p className="fw-bold mb-0 small">{ticket.depart_time}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="col-auto d-none d-md-flex flex-column justify-content-between py-3 px-0">
                      <div className="circle-cutout top"></div>
                      <div className="dashed-line"></div>
                      <div className="circle-cutout bottom"></div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="col-md-3 bg-light-subtle p-4 d-flex flex-column justify-content-center align-items-center text-center">
                      <div className="mb-3">
                        <p className="text-muted small text-uppercase mb-1">Seat</p>
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto" 
                             style={{ width: "80px", height: "80px" }}>
                          <h2 className="fw-bold mb-0">{ticket.seat}</h2>
                        </div>
                      </div>
                      
                      {ticket.status !== 'cancelled' && (
                        <button 
                          onClick={() => handleDeleteBooking(ticket.booking_id)} 
                          className="btn btn-link text-danger text-decoration-none small fw-bold mt-2"
                        >
                          <i className="bi bi-x-circle me-1"></i> Cancel Booking
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CSS within the component */}
        <style>{`
          .extra-small { font-size: 0.65rem; }
          .transition-hover:hover { transform: translateY(-4px); transition: 0.3s; }
          .circle-cutout {
            width: 24px;
            height: 24px;
            background: #f8f9fa;
            border-radius: 50%;
            margin-left: -12px;
          }
          .circle-cutout.top { margin-top: -28px; }
          .circle-cutout.bottom { margin-bottom: -28px; }
          .dashed-line {
            border-left: 2px dashed #dee2e6;
            height: 100%;
            margin-left: -1px;
          }
        `}</style>
      </div>
    </UserLayout>
  )
}

export default Ticket;