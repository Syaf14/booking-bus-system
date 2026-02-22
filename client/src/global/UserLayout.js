import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/auth/logout');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Modern Navbar */}
      <nav className="navbar navbar-expand-lg shadow-sm sticky-top p-0" style={{ background: "#3c97b3" }}>
        <div className="container-fluid px-4" style={{ height: "80px" }}>
          
          {/* Brand Logo */}
          <div className="d-flex align-items-center" style={{cursor: 'pointer'}} onClick={() => navigate("/student-dashboard")}>
            <i className="bi bi-bus-front-fill text-white fs-2 me-2"></i>
            <h2 className="text-white mb-0 fw-bold fst-italic" style={{ letterSpacing: "1px" }}>T-Commerce</h2>
          </div>

          {/* Navigation Links */}
          <div className="d-flex align-items-center h-100 mx-auto">
            <div 
              className="px-4 py-2 text-white d-flex flex-column align-items-center user-nav-link" 
              style={{ cursor: "pointer", transition: "0.3s" }}
              onClick={() => navigate("/student-dashboard")}
            >
              <i className="bi bi-house-door fs-5"></i>
              <span className="small fw-bold">Home</span>
            </div>

            <div 
              className="px-4 py-2 text-white d-flex flex-column align-items-center user-nav-link" 
              style={{ cursor: "pointer", transition: "0.3s" }}
              onClick={() => navigate("/my-tickets")} 
            >
              <i className="bi bi-ticket-perforated fs-5"></i>
              <span className="small fw-bold">My Ticket</span>
            </div>

            <div 
              className="px-4 py-2 text-white d-flex flex-column align-items-center user-nav-link" 
              style={{ cursor: "pointer", transition: "0.3s" }}
              onClick={() => navigate("/profile")}
            >
              <i className="bi bi-person-circle fs-5"></i>
              <span className="small fw-bold">Profile</span>
            </div>
          </div>

          {/* Right Side / Logout */}
          <div className="d-flex align-items-center">
            <div className="vr text-white opacity-50 me-4" style={{height: "30px"}}></div>
            <button 
              className="btn btn-outline-light rounded-pill px-4 fw-bold shadow-sm"
              onClick={handleLogout}
              style={{ transition: "all 0.3s" }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container py-4">
        {/* We wrap children in a subtle container to keep content centered and clean */}
        <div className="animate__animated animate__fadeIn">
          {children}
        </div>
      </main>

      {/* Custom Scoped Styles */}
      <style>{`
        .user-nav-link:hover {
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
        }
        .user-nav-link i {
          margin-bottom: -2px;
        }
        .btn-outline-light:hover {
          background-color: #fff;
          color: #3c97b3 !important;
        }
      `}</style>
    </div>
  );
};

export default UserLayout;