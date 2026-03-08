import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserLayout from '../global/UserLayout';
import axios from 'axios';

function ClassRepDashboard() {
  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState([]);

  useEffect(() => {
    fetchTimeTable();
  }, []);

  const fetchTimeTable = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/scheduleManagement/get-all-schedule-bus");
      setTimeTable(response.data);
    } catch (err) {
      console.error(err);
    }
  };

    // Helper function to group the data by the "day_assigned" property
  const groupedSchedule = timeTable.reduce((groups, item) => {
    const day = item.day_assigned;
    if (!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(item);
    return groups;
  }, {});

  // Get the keys (Monday, Tuesday, etc.) to map through them
  const days = Object.keys(groupedSchedule);

  return (
    <UserLayout>
      <div className="pb-5">
        {/* HERO SECTION */}
        <div 
          className="d-flex justify-content-center align-items-center flex-column shadow-sm" 
          style={{ 
            height: "40vh", 
            background: "linear-gradient(135deg, #3c97b3 0%, #1376c7 100%)",
            borderRadius: "0 0 50px 50px",
            marginBottom: "50px" // Adds clear space below the hero section
          }}
        >
          <h1 className="text-white fw-bold mb-4">Ready to Travel?</h1>
          <button 
            className="btn btn-light rounded-pill px-5 py-3 fw-bold shadow-lg" 
            onClick={() => navigate('/booking')} 
            style={{ 
              color: "#1376c7", 
              fontSize: "1.2rem", 
              transition: "transform 0.2s" 
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            <i className="bi bi-search me-2"></i> SEARCH BUS NOW
          </button>
        </div>

        {/* TIMETABLE SECTION */}
        <div className="container">
          <div className="d-flex align-items-center mb-4">
             <h3 className="fw-bold m-0" style={{ color: "#35557E" }}>
                <i className="bi bi-clock-history me-2"></i>Weekly Bus Schedule
             </h3>
          </div>

          {days.length > 0 ? (
            days.map((day) => (
              <div key={day} className='card border-0 shadow-sm mb-5' style={{ borderRadius: "20px" }}>
                <div className="card-header bg-white border-0 pt-4 px-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="badge bg-primary fs-6 px-4 py-2 rounded-pill">
                      {day}
                    </span>
                  </div>
                </div>
                
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className='table align-middle'>
                      <thead>
                        <tr className="text-muted small text-uppercase" style={{ letterSpacing: "1px" }}>
                          <th className="border-0 pb-3" style={{ width: "10%" }}>Bus</th>
                          <th className="border-0 pb-3" style={{ width: "40%" }}>Route</th>
                          <th className="border-0 pb-3">Depart</th>
                          <th className="border-0 pb-3">Arrive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedSchedule[day].map((table, index) => (
                          <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                            <td className="py-3">
                              <div className="fw-bold text-dark">{table.bus_code}</div>
                            </td>
                            <td className="py-3">
                              <div className="d-flex align-items-center">
                                <span className="fw-semibold text-primary">{table.depart_location}</span>
                                <i className="bi bi-arrow-right mx-2 text-muted"></i>
                                <span className="fw-semibold text-dark">{table.arrive_location}</span>
                              </div>
                            </td>
                            <td className="py-3 fw-bold text-success">
                              {table.depart_time}
                            </td>
                            <td className="py-3 fw-bold text-secondary">
                              {table.arrive_time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="card border-0 shadow-sm text-center py-5" style={{ borderRadius: "20px" }}>
                <i className="bi bi-calendar-x fs-1 d-block mb-2 text-muted"></i>
                <p className="text-muted">No bus schedules available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .bg-primary-subtle { background-color: #e7f0ff !important; }
        .text-primary { color: #1376c7 !important; }
        .table tbody tr:last-child { border-bottom: none !important; }
      `}</style>
    </UserLayout>
  )
}

export default ClassRepDashboard
