import React from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate();
  return (
    <div className="row col-md-12">
      <div className="col-3" style={{height:"100vh",background:"#35557E"}}>
        <div style={{height:"30vh"}}>
          <div className="d-flex justify-content-center align-items-center text-white" style={{minHeight:"30vh"}}>
            <h1>My Information</h1>
          </div>          
        </div>
        <div className='mb-2 px-2'>
          <div className="card" style={{width:"100%"}}>
            <div className="card-body">
              <h4>My Personal Information</h4>
            </div>
          </div>
        </div>
        <div className='mb-2 px-2'>
          <a className='text-decoration-none' onClick={() => navigate("/ticket")}>
            <div className="card" style={{width:"100%"}}>
              <div className="card-body">
                <h4>My Tickets</h4>
              </div>
            </div>            
          </a>
        </div>
      </div>
      <div className="col-12 col-md-9" style={{height:"100vh",background:"#8ba8ce"}}>
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
          <div className="card rounded-3 border-3" style={{width:"50vh",borderColor:"#182988"}}>
            <div className="card-title rounded-top-1 text-center m-0 border-0" style={{backgroundColor:"#24afe6"}}>
              <h2>Politeknik</h2>
            </div>
            <div className="card-body p-0 m-0" style={{height:"60vh"}}>
              <div className='d-flex justify-content-center align-items-center' style={{height:"20vh",backgroundColor:"#1376c7"}}>
                <img src="" alt="Img Profile" style={{aspectRatio:"1/1",height:"15vh",backgroundColor:"#cfcfcf"}}/>
              </div>
              <div className='' style={{height:"40vh"}}>
                <div style={{height:"30vh",background:"#37b2d8"
                }}>
                  <div className='row'>
                    <div className='col-4'>
                      <label>Full Name: </label>
                    </div>
                    <div className="col-8">
                      <p>Wan Mohammad Syafrul Aiman Bin Wan Mohd Sanusi</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>
                      <label>Email: </label>
                    </div>
                    <div className="col-8">
                      <p>example@gmail.com</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>
                      <label>Phone No: </label>
                    </div>
                    <div className="col-8">
                      <p>+6017 289 2440</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>
                      <label>Collage: </label>
                    </div>
                    <div className="col-8">
                      <p>Kampus Bestari</p>
                    </div>
                  </div>
                </div>
                <div className='' style={{height:"10vh"}}>
                  <div className='d-flex justify-content-end align-items-end p-3' style={{height:"10vh"}}>
                    <button className='btn btn-primary'>Edit Profile</button>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile