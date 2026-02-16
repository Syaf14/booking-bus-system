import React from 'react'
import { useNavigate } from 'react-router-dom'

function Booking() {
  const navigate = useNavigate();
  return (
    <div className='bg-secondary'>
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
      <div className='d-flex flex-column justify-content-center align-items-center' style={{minHeight:"90vh"}}>
          <div className="card mb-3 mt-3" style={{width:"80%"}} onClick={() => navigate("/seat-booking")}>
            <div className="card-body p-0">
                <div className='bg-black text-white rounded-top-2' style={{height:"10vh"}}>
                  <div className='d-flex justify-content-start align-items-center px-4' style={{minHeight:"10vh"}}>
                    <h4>BUS CODE: NUMBER</h4>
                  </div>
                </div>
                <div className='bg-light px-4' style={{height:"30vh"}}>
                  <div className='d-flex justify-content-center align-items-center' style={{minHeight:"20vh"}}>
                    <p>Route ----------------------- Destination</p>                    
                  </div>
                  <div className='d-flex justify-content-end align-items-center' style={{height:"10vh"}}>
                    <p>Est-arrive : 00:00</p>
                  </div>
                </div>
            </div>
          </div>
          <div className="card mb-3 mt-3" style={{width:"80%"}}>
            <div className="card-body p-0">
                <div className='bg-black text-white rounded-top-2' style={{height:"10vh"}}>
                  <div className='d-flex justify-content-start align-items-center px-4' style={{minHeight:"10vh"}}>
                    <h4>BUS CODE: NUMBER</h4>
                  </div>
                </div>
                <div className='bg-light px-4' style={{height:"30vh"}}>
                  <div className='d-flex justify-content-center align-items-center' style={{minHeight:"20vh"}}>
                    <p>Route ----------------------- Destination</p>                    
                  </div>
                  <div className='d-flex justify-content-end align-items-center' style={{height:"10vh"}}>
                    <p>Est-arrive : 00:00</p>
                  </div>
                </div>
            </div>
          </div>
          <div className="card mb-3 mt-3" style={{width:"80%"}}>
            <div className="card-body p-0">
                <div className='bg-black text-white rounded-top-2' style={{height:"10vh"}}>
                  <div className='d-flex justify-content-start align-items-center px-4' style={{minHeight:"10vh"}}>
                    <h4>BUS CODE: NUMBER</h4>
                  </div>
                </div>
                <div className='bg-light px-4' style={{height:"30vh"}}>
                  <div className='d-flex justify-content-center align-items-center' style={{minHeight:"20vh"}}>
                    <p>Route ----------------------- Destination</p>                    
                  </div>
                  <div className='d-flex justify-content-end align-items-center' style={{height:"10vh"}}>
                    <p>Est-arrive : 00:00</p>
                  </div>
                </div>
            </div>
          </div>
          <div className="card mb-3 mt-3" style={{width:"80%"}}>
            <div className="card-body p-0">
                <div className='bg-black text-white rounded-top-2' style={{height:"10vh"}}>
                  <div className='d-flex justify-content-start align-items-center px-4' style={{minHeight:"10vh"}}>
                    <h4>BUS CODE: NUMBER</h4>
                  </div>
                </div>
                <div className='bg-light px-4' style={{height:"30vh"}}>
                  <div className='d-flex justify-content-center align-items-center' style={{minHeight:"20vh"}}>
                    <p>Route ----------------------- Destination</p>                    
                  </div>
                  <div className='d-flex justify-content-end align-items-center' style={{height:"10vh"}}>
                    <p>Est-arrive : 00:00</p>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Booking