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
    <div className="h-100">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card bg-light" style={{height:"60vh",width:"50vh"}}>
                <div className="card-title text-center" style={{height:"20vh"}}>
                  <div className="d-flex justify-content-center align-items-center" style={{height:"100%"}}>
                    <div className="d-flex flex-column">
                      <h1>T-Commerce</h1>
                      <p className="fst-italic">"book your college bus here"</p>  
                    </div>                  
                  </div>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                    <input className="form-control mb-2" name="email" onChange={handleChange} placeholder="Email" />
                    <input className="form-control mb-4" name="password" type="password" onChange={handleChange} placeholder="Password" />
                    <div className="d-flex flex-column">
                      <a className="btn fs-6" onClick={() => navigate("/register")}>Sign up</a>
                      <button type="submit" className="btn btn-success">Login</button>                      
                    </div>
                    </form>  
                </div>
            </div>
      
        </div>        
    </div>



  );
}

export default Login;
