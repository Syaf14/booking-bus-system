import { useNavigate } from "react-router-dom";

const AdminLayout = ({children}) => {
    const navigate = useNavigate();
    return ( 
            <div className='row col-md-12'>
                <div className='col-md-3 bg-secondary p-0' style={{height:"100vh"}}>
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
                <div className='col-md-9 bg-light' style={{height:"100vh"}}>
                    <main>
                        {children}
                    </main>
                </div>
                </div>
     );
}

export default AdminLayout;