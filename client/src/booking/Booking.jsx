import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserLayout from '../global/UserLayout';
import axios from 'axios';

function Booking() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/scheduleManagement/get-all-schedule-bus`)
      .then(res => setSchedule(res.data));
  }, [])

  return (
    <UserLayout>
      <div className="container py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#35557E" }}>Available Bus Schedules</h2>
          <p className="text-muted">Select a bus to proceed with seat booking</p>
        </div>

        <div className="d-flex flex-column align-items-center">
          {schedule.map((schedule_bus, index) => (
            <div 
              key={index}
              className="card mb-4 border-0 shadow-sm booking-card" 
              style={{ 
                width: "90%", 
                maxWidth: "900px", 
                borderRadius: "15px", 
                cursor: "pointer",
                transition: "transform 0.2s, shadow 0.2s" 
              }} 
              onClick={() => navigate(`/seat-booking/${schedule_bus.id}`)}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  
                  {/* Left Accent Color & Bus Code */}
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-center text-white rounded-start-15" 
                       style={{ background: "linear-gradient(135deg, #1150af 0%, #062c63 100%)", minHeight: "150px" }}>
                    <i className="bi bi-bus-front fs-1 mb-2"></i>
                    <small className="opacity-75 text-uppercase" style={{ fontSize: '0.7rem' }}>Bus Code</small>
                    <h5 className="fw-bold m-0">{schedule_bus.bus_code}</h5>
                  </div>

                  {/* Middle: Route & Details */}
                  <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="text-center">
                        <span className="small text-muted d-block text-uppercase">Depart</span>
                        <h5 className="fw-bold m-0">{schedule_bus.depart_location}</h5>
                      </div>
                      
                      <div className="flex-grow-1 px-4 text-center position-relative">
                        <div style={{ borderTop: "2px dashed #dee2e6", width: "100%", position: "absolute", top: "50%", left: 0 }}></div>
                        <i className="bi bi-geo-alt-fill text-primary bg-white position-relative px-2 fs-5"></i>
                      </div>

                      <div className="text-center">
                        <span className="small text-muted d-block text-uppercase">Arrive</span>
                        <h5 className="fw-bold m-0">{schedule_bus.arrive_location}</h5>
                      </div>
                    </div>
                  </div>

                  {/* Right: Availability & Action */}
                  <div className="col-md-3 p-4 bg-light d-flex flex-column justify-content-center align-items-center border-start rounded-end-15">
                    <div className="text-center mb-3">
                      <span className="d-block text-muted small">Available Seats</span>
                      <h4 className="fw-bold text-success m-0">{schedule_bus.capacity_seat}</h4>
                    </div>
                    <button className="btn btn-primary rounded-pill w-100 fw-bold shadow-sm" style={{ backgroundColor: "#1150af" }}>
                      Select Seat
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {schedule.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-muted"></i>
              <p className="mt-3 text-muted">No buses found for this route today.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .booking-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .rounded-start-15 {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        @media (max-width: 768px) {
          .rounded-start-15 {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            border-bottom-left-radius: 0;
          }
        }
      `}</style>
    </UserLayout>
  )
}

export default Booking