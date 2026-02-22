import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  // Style for the sidebar links
  const menuButtonStyle = {
    cursor: "pointer",
    transition: "all 0.2s",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    marginBottom: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    textDecoration: "none"
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* SIDEBAR: ACCOUNT MENU */}
        <div 
          className="col-md-3 col-lg-2 d-flex flex-column" 
          style={{ 
            minHeight: "100vh", 
            backgroundColor: "#35557E",
            position: "sticky",
            top: 0
          }}
        >
          {/* Sidebar Header with Profile Icon */}
          <div className="py-5 px-3 text-center text-white">
            <div className="mb-3">
              <i className="bi bi-person-circle" style={{ fontSize: "4rem" }}></i>
            </div>
            <h4 className="fw-bold m-0">My Information</h4>
            <p className="small text-white-50 mt-1">Manage your account</p>
          </div>

          {/* Sidebar Links */}
          <div className="px-3">
            <div 
              style={menuButtonStyle}
              className="account-link"
              onClick={() => navigate('/profile')}
            >
              <i className="bi bi-person-vcard me-3 fs-5"></i>
              <span>Personal Info</span>
            </div>

            <div 
              style={menuButtonStyle}
              className="account-link"
              onClick={() => navigate('/ticket')}
            >
              <i className="bi bi-ticket-detailed me-3 fs-5"></i>
              <span>My Tickets</span>
            </div>
          </div>

          {/* Bottom logout option for sidebar (optional) */}
          <div className="mt-auto p-3">
             <div className="text-white-50 small text-center px-2 py-3 border-top border-secondary">
                T-Commerce v1.0
             </div>
          </div>
        </div>

        {/* MAIN CONTENT SECTION */}
        <div className="col-md-9 col-lg-10 bg-light d-flex flex-column">
          
          {/* Top Navbar */}
          <nav className="navbar navbar-expand-lg bg-white border-bottom px-4" style={{ height: "70px" }}>
            <div className="container-fluid">
              <span className="navbar-brand fw-bold text-muted">User Portal</span>
              
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav align-items-center">
                  <li className="nav-item me-3">
                    <a className="nav-link fw-semibold" style={{cursor: 'pointer'}} onClick={() => navigate("/student-dashboard")}>
                      <i className="bi bi-house-door me-1"></i> Home
                    </a>
                  </li>
                  
                  {/* Search Bar Refined */}
                  <li className="nav-item me-3">
                    <form className="d-flex" role="search">
                      <div className="input-group">
                        <input className="form-control bg-light border-0" type="search" placeholder="Find tickets..." aria-label="Search"/>
                        <button className="btn btn-outline-secondary border-0 bg-light" type="submit">
                          <i className="bi bi-search"></i>
                        </button>
                      </div>
                    </form>
                  </li>

                  <li className="nav-item">
                    <button className="btn btn-danger px-4 rounded-pill shadow-sm fw-bold">
                      <i className="bi bi-box-arrow-right me-2"></i>Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <main className="p-4 flex-grow-1">
            <div className="container-fluid animate__animated animate__fadeIn">
               {/* Content Area Card */}
               <div className="bg-white rounded shadow-sm p-4 border-0" style={{ minHeight: "80vh" }}>
                  {children}
               </div>
            </div>
          </main>

          {/* Refined Footer */}
          <footer className="bg-white border-top py-3 px-4 text-center text-muted small">
            &copy; 2026 T-Commerce Bus Booking System. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Hover Effects CSS */}
      <style>{`
        .account-link:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
          transform: translateX(5px);
          color: #00d1ff !important;
        }
        .nav-link:hover {
          color: #35557E !important;
        }
      `}</style>
    </div>
  );
};

export default Layout;