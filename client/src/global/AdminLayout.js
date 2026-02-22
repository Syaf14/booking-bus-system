import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  // Internal styles for a cleaner look
  const sidebarItemStyle = {
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "0",
    borderLeft: "4px solid transparent",
    color: "#cbd5e0",
    fontSize: "0.9rem",
    fontWeight: "500"
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* SIDEBAR */}
        <div 
          className="col-md-3 col-lg-2 d-flex flex-column" 
          style={{ 
            minHeight: "100vh", 
            backgroundColor: "#025381", 
            position: "sticky", 
            top: 0 
          }}
        >
          {/* Sidebar Brand/Logo */}
          <div 
            className="d-flex justify-content-center align-items-center bg-white shadow-sm" 
            style={{ height: "100px", marginBottom: "20px" }}
          >
            <h5 className="m-0 fw-bold text-dark text-center">
              <i className="bi bi-shield-check text-primary me-2"></i>
              ADMIN SYSTEM
            </h5>
          </div>

          {/* Navigation Menu */}
          <div className="flex-grow-1 px-0">
            <div className="text-uppercase small px-4 mb-3" style={{ color: "#83a8bd", letterSpacing: "1px" }}>
              Main Menu
            </div>

            {/* Nav Items */}
            {[
              { label: "DASHBOARD", icon: "bi-house-door-fill", path: "/admin-dashboard" },
              { label: "BUS MANAGEMENT", icon: "bi-bus-front-fill", path: "/admin-bus-management" },
              { label: "SCHEDULE TIMETABLE", icon: "bi-calendar-week", path: "/admin-schedule-management" },
              { label: "MANAGE BOOKING", icon: "bi-journal-bookmark-fill", path: "/admin-booking-management" },
              { label: "USER MANAGEMENT", icon: "bi-people-fill", path: "/admin-user-management" },
              { label: "REPORTS & NOTIFS", icon: "bi-card-text", path: "/admin-report-notification-management" },
            ].map((item, index) => (
              <div
                key={index}
                className="py-3 px-4 sidebar-link"
                style={sidebarItemStyle}
                onClick={() => navigate(item.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderLeftColor = "#00d1ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#cbd5e0";
                  e.currentTarget.style.borderLeftColor = "transparent";
                }}
              >
                <i className={`bi ${item.icon} me-3 fs-5`}></i>
                {item.label}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-top" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="d-flex align-items-center text-white-50 px-2">
              <i className="bi bi-person-circle fs-4 me-2"></i>
              <div className="small">
                <div className="text-white fw-bold">Admin User</div>
                <div style={{fontSize: '10px'}}>System Administrator</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="col-md-9 col-lg-10 bg-light">
          {/* Top Bar for spacing/context */}
          <nav className="navbar navbar-expand navbar-light bg-white border-bottom px-4 shadow-sm" style={{ height: "60px" }}>
            <span className="navbar-brand mb-0 h6 text-muted">Management Dashboard</span>
          </nav>

          <main className="p-4" style={{ minHeight: "calc(100vh - 60px)" }}>
            <div className="card border-0 shadow-sm p-4">
              {children}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .sidebar-link:active {
          background-color: rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;