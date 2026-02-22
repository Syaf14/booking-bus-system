import { useNavigate } from "react-router-dom";

const UserLayout = ({children}) => {
    const navigate = useNavigate();
    return ( 
        <div className="bg-light">
            <div className="" style={{height:"15vh",background:"#3c97b3"}}>
                <nav className='nav nav-tabs align-items-center' style={{height:"100%"}}>
                    <a className='nav-link' onClick={() => navigate("/student-dashboard")}>
                        <div className="card" style={{width:"20vh"}}>
                            <div className="card-body">
                                Home
                            </div>
                        </div>
                    </a>
                    <a className='nav-link'>
                        <div className="card" style={{width:"20vh"}}>
                            <div className="card-body">
                                My Ticket
                            </div>
                        </div>
                    </a>
                    <a className='nav-link' onClick={() => navigate("/profile")}>
                        <div className="card" style={{width:"20vh"}}>
                            <div className="card-body">
                                Profile
                            </div>
                        </div>
                    </a>
                </nav>
            </div>
            <main>
                {children}
            </main>
        </div>
     );
}

export default UserLayout;