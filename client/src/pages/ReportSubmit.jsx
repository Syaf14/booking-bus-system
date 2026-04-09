import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../global/UserLayout';
import axios from 'axios';

function ReportSubmit() {
  const { id } = useParams(); // User ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    user_id: id,
    title: '',
    category: 'Bus Delay',
    description: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3001/api/reportManagement/submit-report', formData);
            
            if (response.data.success || response.status === 201) {
                alert("Report submitted successfully!");
                navigate(-1);
            }
        } catch (err) {
            // THIS WILL LOG THE EXACT REASON
            console.error("Submission Error Details:", err.response ? err.response.data : err.message);
            alert(`Error: ${err.message}`); 
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <UserLayout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            
            {/* Header Section */}
            <div className="text-center mb-4">
              <div className="bg-danger-subtle text-danger d-inline-block p-3 rounded-circle mb-3">
                <i className="bi bi-exclamation-octagon-fill fs-1"></i>
              </div>
              <h2 className="fw-bold">Submit a Report</h2>
              <p className="text-muted">Help us improve your experience by reporting issues or delays.</p>
            </div>

            <div className="card border-0 shadow-lg" style={{ borderRadius: "24px" }}>
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  
                  {/* Title Input */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">Subject / Summary</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg bg-light border-0 shadow-none" 
                      placeholder="e.g., Bus #102 was 20 minutes late"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      style={{ borderRadius: "12px" }}
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">Issue Category</label>
                    <select 
                      className="form-select form-select-lg bg-light border-0 shadow-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      style={{ borderRadius: "12px" }}
                    >
                      <option value="Bus Delay">Bus Delay</option>
                      <option value="Driver Behavior">Driver Behavior</option>
                      <option value="App Bug">App Bug</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Detailed Description */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">Detailed Description</label>
                    <textarea 
                      className="form-control bg-light border-0 shadow-none" 
                      rows="5" 
                      placeholder="Please provide as much detail as possible (Date, Time, Location, etc.)"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={{ borderRadius: "12px" }}
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3 mt-5">
                    <button 
                      type="button" 
                      onClick={() => navigate(-1)}
                      className="btn btn-light px-4 py-3 rounded-pill fw-bold text-muted w-100"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="btn btn-danger px-4 py-3 rounded-pill fw-bold shadow w-100"
                    >
                      {submitting ? 'Submitting...' : 'Send Report'}
                    </button>
                  </div>

                </form>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="small text-muted">
                <i className="bi bi-shield-fill-check me-1"></i>
                Your feedback is anonymous to the driver, but visible to the system administrator.
              </p>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default ReportSubmit;