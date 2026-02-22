import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ScheduleManagement() {
    const navigate = useNavigate();
    const [schedule,setSchedule] = useState([]);

    useEffect(() => {
      fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/scheduleManagement/get-all-schedule-bus");
        setSchedule(response.data);
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <div className='row col-md-12'>
      <div className='col-3 bg-secondary p-0' style={{height:"100vh"}}>
        <div className='title-navbar bg-white mb-3' style={{height:"15vh",width:"100%"}}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <h2 className='fst-italic'>ADMIN SYSTEM</h2>
          </div>
        </div>
        <div className='px-2 m-0'>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-dashboard')}><i className="bi bi-house-door-fill mx-3"></i>DASHBOARD</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate("/admin-bus-management")}><i className="bi bi-bus-front-fill mx-3"></i>BUS MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-schedule-management')}><i className="bi bi-calendar-week mx-3"></i>SCHEDULE TIMETABLE</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-booking-management')}><i className="bi bi-journal-bookmark-fill mx-3"></i>BOOKING MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-user-management')}><i className="bi bi-people-fill mx-3"></i>USER MANAGEMENT</a>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <a className='btn' onClick={() => navigate('/admin-report-notification-management')}><i className="bi bi-card-text mx-3"></i>REPORT & NOTIFICATION</a>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className='col-12 col-md-9 bg-light' style={{height:"100vh"}}>
        <div className='bg-white border-bottom border-3'style={{height:"20vh",width:"100%"}}>
            <div className='px-5 d-flex align-items-center h-100 w-100'>
                <h1 className='fw-bold'>Schedule Management</h1>
            </div>
        </div>
        <div className='d-flex justify-content-end px-3 py-3'>
          <button className='btn btn-primary' onClick={() => navigate('/add-schedule-bus')}>+Add Schedule Bus</button>
        </div>
        <div>
          <table className='table table-bordered'>
                <thead className=''>
                    <tr className='text-center'>
                        <td style={{width:"5vh"}}>
                          No
                        </td>
                        <td style={{width:"20vh"}}>
                            Route
                        </td>
                        <td>
                            Depart Time
                        </td>
                        <td>
                            Arrive Time
                        </td> 
                        <td>
                            Action
                        </td>                       
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((schedule,index) => (
                      <tr key={schedule.id} className='text-center'>
                        <td>{index + 1}</td>
                        <td>{schedule.depart_location} - {schedule.arrive_location}</td>
                        <td>{schedule.depart_time}</td>
                        <td>{schedule.arrive_time}</td>
                        <td>
                          <div className="btn-group">
                            <a href="" className='btn btn-primary'>View</a>
                            <a href="" className='btn btn-danger'>Delete</a>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {schedule.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">No buses found</td>
                      </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default ScheduleManagement 