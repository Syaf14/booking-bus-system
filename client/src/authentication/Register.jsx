import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      const res = await API.post("/auth/register", form);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ 
           background: "linear-gradient(135deg, #35557E 0%, #1150af 100%)",
           padding: "40px 20px" 
         }}>
      
      <div className="card border-0 shadow-lg overflow-hidden" 
           style={{ maxWidth: "600px", width: "100%", borderRadius: "25px" }}>
        
        {/* Header Section */}
        <div className="p-4 text-center bg-white border-bottom">
          <h2 className="fw-bold mb-1" style={{ color: "#35557E" }}>Join T-Commerce</h2>
          <p className="text-muted small mb-0">Create your account to start booking bus seats</p>
        </div>

        {/* Form Section */}
        <div className="card-body p-4 p-md-5 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="small fw-bold text-muted mb-2 d-block">Your Role</label>
              <div className="d-flex p-1 bg-light rounded-pill border" style={{ position: 'relative' }}>
                
                {/* Student Option */}
                <div className="flex-fill">
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="role" 
                    id="roleStudent" 
                    value="student" 
                    onChange={handleChange} 
                    defaultChecked 
                  />
                  <label 
                    className="btn btn-role-toggle w-100 rounded-pill border-0 py-2 fw-bold" 
                    htmlFor="roleStudent"
                  >
                    Student
                  </label>
                </div>

                {/* Class Rep Option */}
                <div className="flex-fill">
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="role" 
                    id="roleClassRep" 
                    value="class rep" 
                    onChange={handleChange} 
                  />
                  <label 
                    className="btn btn-role-toggle w-100 rounded-pill border-0 py-2 fw-bold" 
                    htmlFor="roleClassRep"
                  >
                    Class Rep
                  </label>
                </div>

              </div>
            </div>
            {/* Full Name */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Full Name</label>
              <div className="input-group border rounded-pill px-3 py-1">
                <span className="input-group-text bg-transparent border-0"><i className="bi bi-person text-muted"></i></span>
                <input className="form-control border-0 shadow-none bg-transparent" name="name" onChange={handleChange} placeholder="John Doe" required />
              </div>
            </div>

            <div className="row">
              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="small fw-bold text-muted mb-1">Email</label>
                <div className="input-group border rounded-pill px-3 py-1">
                  <span className="input-group-text bg-transparent border-0"><i className="bi bi-envelope text-muted"></i></span>
                  <input className="form-control border-0 shadow-none bg-transparent" name="email" onChange={handleChange} placeholder="email@uni.edu" required />
                </div>
              </div>
              {/* Phone */}
              <div className="col-md-6 mb-3">
                <label className="small fw-bold text-muted mb-1">Phone Number</label>
                <div className="input-group border rounded-pill px-3 py-1">
                  <span className="input-group-text bg-transparent border-0"><i className="bi bi-phone text-muted"></i></span>
                  <input className="form-control border-0 shadow-none bg-transparent" placeholder="012-3456789" />
                </div>
              </div>
            </div>

            {/* Student ID */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Student ID</label>
              <div className="input-group border rounded-pill px-3 py-1">
                <span className="input-group-text bg-transparent border-0"><i className="bi bi-card-text text-muted"></i></span>
                <input className="form-control border-0 shadow-none bg-transparent" placeholder="SW0101xxx" />
              </div>
            </div>

            <div className="row">
              {/* Password */}
              <div className="col-md-6 mb-3">
                <label className="small fw-bold text-muted mb-1">Password</label>
                <div className="input-group border rounded-pill px-3 py-1">
                  <span className="input-group-text bg-transparent border-0"><i className="bi bi-lock text-muted"></i></span>
                  <input className="form-control border-0 shadow-none bg-transparent" name="password" type="password" onChange={handleChange} placeholder="••••••••" required />
                </div>
              </div>
              {/* Confirm Password */}
              <div className="col-md-6 mb-4">
                <label className="small fw-bold text-muted mb-1">Confirm Password</label>
                <div className="input-group border rounded-pill px-3 py-1">
                  <span className="input-group-text bg-transparent border-0"><i className="bi bi-check2-circle text-muted"></i></span>
                  <input className="form-control border-0 shadow-none bg-transparent" type="password" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill py-3 fw-bold mb-3 shadow-sm" style={{ background: "#1150af", border: "none" }}>
              CREATE ACCOUNT
            </button>

            <div className="text-center">
              <span className="text-muted small">Already have an account? </span>
              <button type="button" className="btn btn-link btn-sm p-0 fw-bold text-decoration-none" onClick={() => navigate("/")} style={{ color: "#1150af" }}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;