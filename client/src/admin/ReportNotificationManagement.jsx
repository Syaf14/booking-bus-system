import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../global/AdminLayout';

function ReportNotificationManagement() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  // --- Filter State ---
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reportManagement/get-report`);
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, []);

  // --- Filter Logic ---
  const filteredReports = reports.filter(report => {
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const handleSolve = async (id) => {
    if (!window.confirm("Mark this report as Resolved?")) return;
    try {
      await axios.put(`http://localhost:5000/api/reportManagement/update-status/${id}`);
      fetchReports();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Bus Delay': return 'bg-warning-subtle text-warning-emphasis border-warning-subtle';
      case 'Driver Behavior': return 'bg-danger-subtle text-danger-emphasis border-danger-subtle';
      case 'App Bug': return 'bg-info-subtle text-info-emphasis border-info-subtle';
      default: return 'bg-light text-dark border-secondary-subtle';
    }
  };

  return (
    <AdminLayout>
      <div className='bg-white border-bottom shadow-sm' style={{ height: "15vh", width: "100%" }}>
        <div className='px-5 d-flex align-items-center justify-content-between h-100 w-100'>
          <h1 className='fw-bold mb-0'>Student Reports</h1>
        </div>
      </div>

      <div className="container-fluid p-4">
        {/* Stats Section */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-primary text-white rounded-4">
              <small className="opacity-75">Total Reports</small>
              <h3 className="fw-bold mb-0">{reports.length}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-danger text-white rounded-4">
              <small className="opacity-75">Pending Issues</small>
              <h3 className="fw-bold mb-0">{reports.filter(r => r.status === 'Pending').length}</h3>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="card border-0 shadow-sm rounded-4 mb-3">
          <div className="card-body d-flex gap-3 align-items-center">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-filter text-muted"></i>
              <span className="small fw-bold text-muted text-uppercase">Filters:</span>
            </div>
            
            {/* Category Filter */}
            <select 
              className="form-select form-select-sm border-0 bg-light rounded-3" 
              style={{ width: '200px' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Bus Delay">Bus Delay</option>
              <option value="Driver Behavior">Driver Behavior</option>
              <option value="App Bug">App Bug</option>
              <option value="Others">Others</option>
            </select>

            {/* Status Filter */}
            <select 
              className="form-select form-select-sm border-0 bg-light rounded-3" 
              style={{ width: '150px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Results Count */}
            <span className="small text-muted ms-auto">
              Showing <strong>{filteredReports.length}</strong> reports
            </span>
          </div>
        </div>

        {/* Table Section */}
        <div className='card border-0 shadow-sm rounded-4 overflow-hidden'>
          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0'>
              <thead className='bg-light'>
                <tr className="text-muted small fw-bold text-uppercase">
                  <th className="ps-4">Student</th>
                  <th>Category</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, index) => (
                    <tr key={index}>
                      <td className="ps-4">
                        <div className="fw-bold">{report.full_name}</div>
                        <div className="small text-muted">{report.email}</div>
                      </td>
                      <td><span className={`badge border ${getCategoryStyle(report.category)}`}>{report.category}</span></td>
                      <td className="text-truncate" style={{ maxWidth: '150px' }}>{report.title}</td>
                      <td>{new Date(report.created_at).toLocaleDateString()}</td>
                      <td className="text-center">
                        <span className={`badge rounded-pill ${report.status === 'Resolved' ? 'bg-success' : 'bg-secondary'}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className='btn-group'>
                          <button 
                            className="btn btn-sm btn-outline-dark" 
                            data-bs-toggle="modal" 
                            data-bs-target="#detailModal"
                            onClick={() => setSelectedReport(report)}
                          >
                            View
                          </button>
                          <button 
                            className="btn btn-sm btn-success" 
                            disabled={report.status === 'Resolved'}
                            onClick={() => handleSolve(report.id)}
                          >
                            Solve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No reports found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL remains unchanged */}
      <div className="modal fade" id="detailModal" tabIndex="-1" aria-hidden="true">
        {/* ... (previous modal code) ... */}
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="fw-bold">Report Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body py-4">
              {selectedReport && (
                <>
                  <div className="mb-3">
                    <label className="small text-muted text-uppercase fw-bold">Subject</label>
                    <p className="fw-bold fs-5">{selectedReport.title}</p>
                  </div>
                  <div className="mb-3">
                    <label className="small text-muted text-uppercase fw-bold">Description</label>
                    <div className="p-3 bg-light rounded-3 text-dark" style={{whiteSpace: 'pre-wrap'}}>
                      {selectedReport.description}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label className="small text-muted text-uppercase fw-bold">Category</label>
                      <p>{selectedReport.category}</p>
                    </div>
                    <div className="col-6">
                      <label className="small text-muted text-uppercase fw-bold">Status</label>
                      <p><span className="badge bg-primary">{selectedReport.status}</span></p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ReportNotificationManagement;