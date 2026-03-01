import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserLayout from '../global/UserLayout';
import axios from 'axios';

function Booking() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  // 1. Add state for the selected day (default to 'isnin')
  const [selectedDay, setSelectedDay] = useState('isnin');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/scheduleManagement/get-all-schedule-bus`)
      .then(res => setSchedule(res.data))
      .catch(err => console.error("Error fetching schedules:", err));
  }, [])

  // 2. Filter the schedule list based on the day_assigned column from your database
  const filteredSchedule = schedule.filter(item => 
    item.day_assigned?.toLowerCase() === selectedDay.toLowerCase()
  );

  return (
    <UserLayout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#35557E" }}>Available Bus Schedules</h2>
          <p className="text-muted">Select a bus to proceed with seat booking</p>
        </div>

        {/* Day Selection Section */}
        <div className="mb-4">
          <label className="form-label fw-bold mb-2">Pilih Hari:</label>
          <div className="d-flex p-1 bg-light rounded-pill border flex-wrap flex-md-nowrap" style={{ position: 'relative' }}>
            {[
              { id: 'mon', label: 'Isnin', val: 'isnin' },
              { id: 'tue', label: 'Selasa', val: 'selasa' },
              { id: 'wed', label: 'Rabu', val: 'rabu' },
              { id: 'thu', label: 'Khamis', val: 'khamis' },
              { id: 'fri', label: 'Jumaat', val: 'jumaat' }
            ].map((day) => (
              <div key={day.id} className="flex-fill">
                <input 
                  type="radio" 
                  className="btn-check" 
                  name="daySelection" 
                  id={day.id} 
                  value={day.val} 
                  checked={selectedDay === day.val} // Controlled component
                  onChange={(e) => setSelectedDay(e.target.value)} // Update state on click
                />
                <label 
                  className="btn btn-role-toggle w-100 rounded-pill border-0 py-2 fw-bold" 
                  htmlFor={day.id}
                  style={{ fontSize: '0.9rem' }}
                >
                  {day.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Bus List Section - Now uses filteredSchedule */}
        <div className="d-flex flex-column align-items-center">
          {filteredSchedule.map((schedule_bus, index) => (
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
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-center text-white rounded-start-15" 
                       style={{ background: "linear-gradient(135deg, #1150af 0%, #062c63 100%)", minHeight: "150px" }}>
                    <i className="bi bi-bus-front fs-1 mb-2"></i>
                    <small className="opacity-75 text-uppercase" style={{ fontSize: '0.7rem' }}>Bus Code</small>
                    <h5 className="fw-bold m-0">{schedule_bus.bus_code}</h5>
                  </div>

                  {/* Middle: Route & Details */}
                  <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
                    {/* Time of Departure Added Here */}
                    <div className="mb-3 d-flex align-items-center justify-content-center justify-content-md-start">
                      <i className="bi bi-clock-fill text-primary me-2"></i>
                      <span className="fw-bold text-dark">Departure Time: {schedule_bus.depart_time}</span>
                    </div>

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

          {/* Empty State Logic */}
          {filteredSchedule.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-muted"></i>
              <p className="mt-3 text-muted">No buses found for <strong>{selectedDay}</strong>.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .btn-check:checked + .btn-role-toggle {
          background-color: #1150af !important;
          color: white !important;
        }
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

export default Booking;