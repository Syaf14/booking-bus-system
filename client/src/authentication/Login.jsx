import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ 
           background: "linear-gradient(135deg, #35557E 0%, #1150af 100%)",
           padding: "20px" 
         }}>
      
      <div className="card border-0 shadow-lg overflow-hidden" 
           style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
        
        {/* Header Section */}
        <div className="p-5 text-center bg-white">
          <div className="mb-3">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle" 
                 style={{ width: "80px", height: "80px" }}>
              <i className="bi bi-bus-front-fill fs-1 text-primary"></i>
            </div>
          </div>
          <h2 className="fw-bold mb-1" style={{ color: "#35557E" }}>T-Commerce</h2>
          <p className="text-muted small italic">"Your gateway to campus travel"</p>
        </div>

        {/* Form Section */}
        <div className="card-body px-5 pb-5 pt-0 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Email Address</label>
              <div className="input-group border rounded-pill px-3 py-1">
                <span className="input-group-text bg-transparent border-0">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input 
                  className="form-control border-0 shadow-none bg-transparent" 
                  name="email" 
                  type="email"
                  onChange={handleChange} 
                  placeholder="name@college.edu" 
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="small fw-bold text-muted mb-1">Password</label>
              <div className="input-group border rounded-pill px-3 py-1">
                <span className="input-group-text bg-transparent border-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input 
                  className="form-control border-0 shadow-none bg-transparent" 
                  name="password" 
                  type="password" 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 rounded-pill py-3 fw-bold mb-3 shadow-sm"
              style={{ background: "#1150af", border: "none" }}
            >
              SIGN IN
            </button>

            <div className="text-center">
              <span className="text-muted small">Don't have an account? </span>
              <button 
                type="button"
                className="btn btn-link btn-sm p-0 fw-bold text-decoration-none" 
                onClick={() => navigate("/register")}
                style={{ color: "#1150af" }}
              >
                Sign up now
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .bg-primary-subtle { background-color: #e7f0ff !important; }
        .input-group:focus-within { border-color: #1150af !important; ring: 0.2rem rgba(17, 80, 175, 0.25); }
        .btn-primary:hover { background: #0d3b66 !important; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}

export default Login;