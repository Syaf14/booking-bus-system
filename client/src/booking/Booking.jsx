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
  },[])
  return (
    <UserLayout>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{minHeight:"90vh"}}>
          {schedule.map(schedule_bus => (
            <div className="card mb-3 mt-3" style={{width:"80%"}} onClick={() => navigate(`/seat-booking/${schedule_bus.id}`)}>
              <div className="card-body p-0">
                  <div className='text-white rounded-top-2' style={{height:"10vh",background:"#1150af"}}>
                    <div className='d-flex justify-content-start align-items-center px-4' style={{minHeight:"10vh"}}>
                      <h4>BUS CODE: {schedule_bus.bus_code}</h4>
                    </div>
                  </div>
                  <div className='bg-light p-4' style={{height:"10vh"}}>
                    <div className='d-flex justify-content-center align-items-center' style={{height:"3vh"}}>
                      <p><i className="bi bi-map-fill mx-2"></i>{schedule_bus.depart_location} ----------------------- {schedule_bus.arrive_location}<i className="bi bi-geo-alt-fill mx-2"></i></p>                    
                    </div>
                    <div className='d-flex justify-content-end align-items-center' style={{height:"5vh"}}>
                      <p>Capacity Seat: {schedule_bus.capacity_seat}</p>
                    </div>
                  </div>
              </div>
            </div>            
          ))}
      </div>
    </UserLayout>
  )
}

export default Booking