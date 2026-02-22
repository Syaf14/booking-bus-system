import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

function BookingManagement() {
    const navigate = useNavigate();
    const [booking, setBooking] = useState([]);

    useEffect(() => {
      fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
        const response = await axios.get("http://localhost:5000/api/bookingManagement/get-booking-management");
        setBooking(response.data);
        } catch (err) {
        console.error(err);
        }
    };
  return (
    <AdminLayout>
        <div className='bg-white border-bottom border-3'style={{height:"20vh",width:"100%"}}>
            <div className='px-5 d-flex align-items-center h-100 w-100'>
                <h1 className='fw-bold'>Booking Management</h1>
            </div>
        </div>
        <div className='card'>
          <div className="card-header">
            <div className='d-flex justify-content-end'>
              <div className='d-flex'>
                <input type="text" className='form-control mx-3' placeholder="Search..."/>
                <button className='btn btn-primary'>Search</button>                
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className='table table-bordered'>
                <thead className=''>
                    <tr className='text-center'>
                        <td className='' style={{width:"5vh"}}>
                            No
                        </td>
                        <td>
                            Email Student
                        </td>
                        <td>
                            Bus Code
                        </td>
                        <td>
                            Seat Type
                        </td> 
                        <td style={{width:"40vh"}}>
                            Action  
                        </td>                      
                    </tr>
                </thead>
                <tbody>
                  {booking.map((book, index) => (
                    <tr key={book.id || index} className='text-center'> {/* Added fallback key */}
                      <td>{index + 1}</td>
                      <td>{book.email}</td>
                      <td>{book.bus_code}</td> {/* This now works with the updated SQL */}
                      <td>{book.seat_number} ({book.seat_type})</td>
                      <td>
                        <div className='btn-group'>
                          <a href="" className='btn btn-secondary'><i className="bi bi-pencil-square mx-1"></i>Edit</a>
                          <a href="" className='btn btn-primary'><i className="bi bi-eye-fill mx-1"></i>View</a>
                          <a href="" className='btn btn-danger'><i className="bi bi-trash-fill mx-1"></i>Delete</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
    </AdminLayout>
  )
}

export default BookingManagement