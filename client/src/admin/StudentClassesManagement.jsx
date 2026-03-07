import React from 'react'
import AdminLayout from '../global/AdminLayout'

function StudentClassesManagement() {
  return (
    <AdminLayout>
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Student Classes Management</h2>
                        <p className="text-muted small mb-0">Manage student classes</p>
                    </div>
                    
                    <div className="d-flex shadow-sm rounded-3 overflow-hidden" style={{ width: '350px' }}>
                        <input 
                            type="text" 
                            className="form-control border-0 py-2 ps-3" 
                            placeholder="Search by student email..."
                        />
                        <button className="btn btn-primary px-3 border-0 rounded-0">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mx-3 rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-0 py-3">
                        <div className="d-flex align-items-center">
                            <div className="bg-warning bg-opacity-10 p-2 rounded-3 me-3">
                                <i className="bi bi-ticket-perforated text-warning"></i>
                            </div>
                            <h5 className="mb-0 fw-bold">Student Classes 2026</h5>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr className="text-muted small text-uppercase">
                                    <th className="ps-4" style={{ width: "80px" }}>No</th>
                                    <th>Course Code</th>
                                    <th className='text-center'>Semester</th>
                                    <th className="text-center">Student Capacity</th>
                                    <th className="text-center">Student Class Rep</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                    <tr>
                                        <td className="ps-4 fw-bold text-muted"></td>
                                        <td>
                                            
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-dark rounded-1 px-3 py-2">
                                                <i className="bi bi-bus-front me-1"></i>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                                    <i className="bi bi-person text-secondary"></i>
                                                </div>
                                                <span className="fw-semibold"></span>
                                            </div>
                                        </td>
                                        <td>
                                            
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group shadow-sm">
                                                <button className="btn btn-white btn-sm border" title="Edit Booking">
                                                    <i className="bi bi-pencil-square text-secondary"></i>
                                                </button>
                                                <button className="btn btn-white btn-sm border" title="View Details">
                                                    <i className="bi bi-eye-fill text-primary"></i>
                                                </button>
                                                <button className="btn btn-white btn-sm border" title="Cancel Booking">
                                                    <i className="bi bi-trash-fill text-danger"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </AdminLayout>
  )
}

export default StudentClassesManagement
