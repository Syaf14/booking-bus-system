import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className='bg-light vh-100'>
      <div className="text-white" style={{height:"10vh"}}>
        <nav className='navbar'>
          <a href="" className='nav-link'>
            <div className="card" style={{width:"30vh"}}>
              <div className="card-body">
                Book Ticket
              </div>
            </div>
          </a>
          <a href="" className='nav-link'>
            <div className="card" style={{width:"30vh"}}>
              <div className="card-body">
                Time Table
              </div>
            </div>
          </a>
          <a href="" className='nav-link'>
            <div className="card" style={{width:"30vh"}}>
              <div className="card-body">
                My Ticket
              </div>
            </div>
          </a>
          <a href="" className='nav-link'>
            <div className="card" style={{width:"30vh"}}>
              <div className="card-body">
                Profile
              </div>
            </div>
          </a>
        </nav>
      </div>
      <div style={{height:"90vh"}}>
        <div className="d-flex justify-content-center align-items-center" style={{height:"100%"}}>
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
              <a className='btn btn-danger rounded-5 px-5 py-2' onClick={() => navigate('/booking')}>Search Bus</a>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard