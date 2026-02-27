import React from 'react'
import UserLayout from '../global/UserLayout';

function Ticket() {
  // Hardcoded ticket data
  const tickets = [
    {
      id: "TICK-88291",
      busName: "Express Mutiara",
      plateNo: "WAB 1234",
      date: "25 OCT 2026",
      time: "09:00 AM",
      from: "Kuala Lumpur (TBS)",
      to: "Kota Bharu",
      seat: "12A",
      status: "Confirmed"
    },
    {
      id: "TICK-77342",
      busName: "Perdana Express",
      plateNo: "KCT 5566",
      date: "02 NOV 2026",
      time: "11:30 PM",
      from: "Kota Bharu",
      to: "Kuala Lumpur (TBS)",
      seat: "05B",
      status: "Pending"
    }
  ];

  return (
    <UserLayout>
      <div className="container py-4">
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-1">My Bookings</h4>
          <p className="text-muted small">View and manage your recent bus ticket purchases.</p>
        </div>

        <div className="row">
          {tickets.map((ticket, index) => (
            <div className="col-12 mb-3" key={index}>
              <div className="card border-0 shadow-sm p-3" style={{ borderRadius: "12px" }}>
                <div className="row align-items-center">
                  
                  {/* Bus & ID Info */}
                  <div className="col-md-3 border-end">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-bus-front text-primary fs-4 me-2"></i>
                      <span className="fw-bold text-dark">{ticket.busName}</span>
                    </div>
                    <p className="text-muted small mb-0">ID: {ticket.id}</p>
                    <p className="text-muted small mb-0">Plate: {ticket.plateNo}</p>
                  </div>

                  {/* Route Info */}
                  <div className="col-md-5 px-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-center">
                        <span className="d-block small text-uppercase text-muted">From</span>
                        <span className="fw-bold">{ticket.from}</span>
                      </div>
                      <i className="bi bi-arrow-right text-secondary fs-5"></i>
                      <div className="text-center">
                        <span className="d-block small text-uppercase text-muted">To</span>
                        <span className="fw-bold">{ticket.to}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Info */}
                  <div className="col-md-2 border-start text-center">
                    <span className="d-block small text-muted">Schedule</span>
                    <div className="fw-bold">{ticket.date}</div>
                    <div className="small text-secondary">{ticket.time}</div>
                  </div>

                  {/* Seat & Status */}
                  <div className="col-md-2 text-end">
                    <div className="mb-1">
                       <span className="small text-muted me-2">Seat:</span>
                       <span className="fw-bold">{ticket.seat}</span>
                    </div>
                    <span className={`badge rounded-pill ${ticket.status === 'Confirmed' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} border px-3`}>
                      {ticket.status}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
        
        {tickets.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-ticket-detailed text-light" style={{fontSize: "4rem"}}></i>
            <p className="text-muted mt-3">You don't have any tickets yet.</p>
          </div>
        )}
      </div>
    </UserLayout>
  )
}

export default Ticket