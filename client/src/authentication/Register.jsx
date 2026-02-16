import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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
                    <input className='form-control mb-2' name="name" onChange={handleChange} placeholder="Name" />
                    <input className="form-control mb-2" name="email" onChange={handleChange} placeholder="Email" />
                    <input className="form-control mb-4" name="password" type="password" onChange={handleChange} placeholder="Password" />
                    <div className="d-flex flex-column">
                      <a className="btn fs-6" onClick={() => navigate("/")}>Sign in</a>
                      <button className="btn btn-success" type="submit">Register</button>
                    </div>
                    </form>                     
                </div>
            </div>   
        </div>
    </div>

  );
}

export default Register;
