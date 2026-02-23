import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../global/AdminLayout';

function ReportNotificationManagement() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Fetching the schedule/booking report data
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Replace with your actual endpoint for bus reports/schedules
        const response = await axios.get("http://localhost:5000/api/reports/bus-summary");
        setReports(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <AdminLayout>
      {/* Header Section */}
      <div className='bg-white border-bottom shadow-sm' style={{ height: "15vh", width: "100%" }}>
        <div className='px-5 d-flex align-items-center justify-content-between h-100 w-100'>
          <div>
            <h1 className='fw-bold mb-0'>Report & Notification</h1>
            <p className='text-muted'>Monitor bus schedules and system performance</p>
          </div>
          <button className="btn btn-success shadow-sm">
            <i className="bi bi-file-earmark-excel me-2"></i>Export Report
          </button>
        </div>
      </div>

      <div className="container-fluid p-4">
        {/* Stats Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-primary text-white">
              <small>Total Trips</small>
              <h3 className="fw-bold">{reports.length}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-warning text-dark">
              <small>Active Notifications</small>
              <h3 className="fw-bold">5</h3>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className='card border-0 shadow-sm rounded-4 overflow-hidden'>
          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0'>
              <thead className='bg-light'>
                <tr className="text-muted small fw-bold text-uppercase">
                  <th className="ps-4 py-3">Bus Code</th>
                  <th>Bus Name</th>
                  <th>Route (From - To)</th>
                  <th>Schedule</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-5">Loading reports...</td></tr>
                ) : reports.length > 0 ? (
                  reports.map((bus, index) => (
                    <tr key={index}>
                      <td className="ps-4 fw-bold text-primary">{bus.bus_code}</td>
                      <td>{bus.bus_name}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="text-dark fw-semibold">{bus.departure}</span>
                          <i className="bi bi-arrow-right mx-2 text-muted"></i>
                          <span className="text-dark fw-semibold">{bus.destination}</span>
                        </div>
                      </td>
                      <td>
                        <div className="small"><strong>Dep:</strong> {bus.depart_time}</div>
                        <div className="small text-muted"><strong>Arr:</strong> {bus.arrive_time}</div>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          Notify Students
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No reports available at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ReportNotificationManagement;