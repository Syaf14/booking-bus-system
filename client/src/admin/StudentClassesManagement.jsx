import React, { useEffect, useState } from 'react'
import AdminLayout from '../global/AdminLayout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function StudentClassesManagement() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [studentClasses, setStudentClasses] = useState([]);

    useEffect(() => {
        fetchStudentClasses();
    },[])

    const fetchStudentClasses = async () => {
        try {
            console.log("Attempting to fetch from API...");
            const response = await axios.get(`http://localhost:5000/api/studentClassManagement/get-all-student-classes`);
            
            console.log("Full API Response:", response);
            console.log("Data received:", response.data);

            // Ensure we are setting an array
            if (Array.isArray(response.data)) {
                setStudentClasses(response.data);
            } else {
                console.error("Data is not an array! Check backend return format.");
            }
        } catch (error) {
            console.error("Axios Error Details:", error.response || error);
        }
    }

    const filteredStudentClasses = studentClasses.filter(c => 
    c.class_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.rep_email?.toLowerCase().includes(searchTerm.toLowerCase())
);
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
                        <div className='input-group shadow-sm'>
                            <span className='input-group-text bg-white border-end-0'>
                                <i className="bi bi-search"></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 py-2 ps-3" 
                                placeholder="Search by class name....."
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
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
                                {filteredStudentClasses.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="ps-4 fw-bold text-muted">{index + 1}</td>
                                        <td>{item.class_name}</td> {/* Changed from student.name */}
                                        <td className="text-center">
                                            <span className="badge bg-dark rounded-1 px-3 py-2">
                                                Sem {item.semester}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="fw-semibold">{item.capacity_class}</span>
                                        </td>
                                        <td className="text-center">
                                            {/* Show Rep Name or 'No Rep Assigned' */}
                                            {item.rep_name ? (
                                                <div>
                                                    <div className="small fw-bold">{item.rep_name}</div>
                                                    <div className="text-muted x-small">{item.rep_email}</div>
                                                </div>
                                            ) : (
                                                <span className="text-muted italic">No Rep Assigned</span>
                                            )}
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group shadow-sm">
                                                <button className="btn btn-white btn-sm border" title="Edit Booking">
                                                    <i className="bi bi-pencil-square text-secondary"></i>
                                                </button>
                                                <button className="btn btn-white btn-sm border" title="View Details" onClick={() => navigate(`/detail-student-classes`)}>
                                                    <i className="bi bi-eye-fill text-primary"></i>
                                                </button>
                                                <button className="btn btn-white btn-sm border" title="Cancel Booking">
                                                    <i className="bi bi-trash-fill text-danger"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </AdminLayout>
  )
}

export default StudentClassesManagement
