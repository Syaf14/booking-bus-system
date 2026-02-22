import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserLayout from '../global/UserLayout';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <UserLayout>
      <div style={{height:"70vh"}}>
        <div className="d-flex justify-content-center align-items-center" style={{height:"70vh"}}>
          <div className='d-flex flex-column'>
            <div className="card rounded-5 mb-4">
              <div className="card-body rounded-5 p-0">
                <input type="text" className='form-control p-3 py-4 rounded-0 rounded-top-5' placeholder="from" style={{width:"50vh"}}/>
                <input type="text" className='form-control p-3 py-4 rounded-0' placeholder="to" style={{width:"50vh"}}/>
                <input type="text" className='form-control p-3 py-4 rounded-0' placeholder="date" style={{width:"50vh"}}/>
                <input type="text" className='form-control p-3 py-4 rounded-0 rounded-bottom-5' placeholder="seat" style={{width:"50vh"}}/>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <a className='btn rounded-5 px-5 py-2 text-white' onClick={() => navigate('/booking')} style={{background:"#001aff"}}>Search Bus</a>
            </div> 
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default Dashboard