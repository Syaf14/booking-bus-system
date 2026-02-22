import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

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
    <AdminLayout>
        <div className='bg-white border-bottom border-3'style={{height:"20vh",width:"100%"}}>
            <div className='px-5 d-flex align-items-center h-100 w-100'>
                <h1 className='fw-bold'>Schedule Management</h1>
            </div>
        </div>
        <div className='card'>
          <div className="card-header">
            <div className='d-flex justify-content-end px-3 py-3'>
              <button className='btn btn-primary' onClick={() => navigate('/add-schedule-bus')}>+Add Schedule Bus</button>
            </div>            
          </div>
          <div className="card-body">
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


    </AdminLayout>
  )
}

export default ScheduleManagement 