import { useNavigate } from "react-router-dom";

const Layout = ({children}) => {
    const navigate = useNavigate();
    return(
        <div className="">
            <div className="row col-md-12">
                <div className="col-md-3" style={{height:"100vh",background:"#35557E"}}>
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
                    <div className="card" style={{width:"100%"}}>
                        <div className="card-body">
                        <h4>My Tickets</h4>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Profile</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate("/student-dashboard")}>Home</a>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            <a className="btn btn-success mx-2">Log Out</a>
                            </div>
                        </div>
                        </nav>
                    <main>
                        {children} {/* This is your @yield('content') */}
                    </main>
                    <footer> {/* Your Footer code */} </footer>                
                </div>
            </div>
        </div>
    );
};

export default Layout