import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../global/AdminLayout';

function UserManagement() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [adminSearchTerm, setAdminSearchTerm] = useState(""); // Separate search for admins
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Note: If your backend "get-all-user" only returns role='student', 
            // you'll need to update the backend SQL to remove the WHERE clause 
            // or create a new endpoint for admins.
            const response = await axios.get("http://localhost:3001/api/userManagement/get-all-user");
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure? This action cannot be undone.")) {
            try {
                await axios.delete(`http://localhost:3001/api/userManagement/delete-user/${id}`);
                fetchUsers();
            } catch (error) {
                alert("Error deleting user");
            }
        }
    };

    // Filter for Students and Class Reps
    const filteredStudents = users.filter(user => 
        ['student', 'class rep'].includes(user.role?.toLowerCase()) && (
            (user.full_name || user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.student_id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.role || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Filter for Admins
    const filteredAdmins = users.filter(user => 
        user.role?.toLowerCase() === 'admin' && (
        (user.name || "").toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(adminSearchTerm.toLowerCase()))
    );

    return (
        <AdminLayout>
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                
                {/* --- STUDENT SECTION --- */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Student Management</h2>
                        <p className="text-muted small mb-0">Manage student profiles and IDs</p>
                    </div>
                    <div className='d-flex'>
                        <div className="input-group shadow-sm me-2" style={{ width: '300px' }}>
                            <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control border-start-0" placeholder="Search Students..." onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="input-group shadow-sm" style={{ width: '200px' }}>
                            <span className="input-group-text bg-white border-end-0"><i className="bi bi-check"></i></span>
                            <select name="" id="" className='form-select' onChange={(e) => setSearchTerm(e.target.value)}>
                                <option value="" selected disabled>--select role--</option>
                                <option value="">All</option>
                                <option value="student">student</option>
                                <option value="class rep">class rep</option>
                            </select>                                   
                        </div>
                    </div>

                </div>

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mx-3 mb-5">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4 py-3">Student Name</th>
                                    <th>Student ID</th>
                                    <th>Class</th>
                                    <th>Role</th>
                                    <th className="pe-4 text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                                ) : filteredStudents.map((user) => (
                                    <tr key={user.id}>
                                        <td className="ps-4">
                                            <div className="fw-bold">{user.full_name || user.name}</div>
                                            <div className="text-muted small">{user.email}</div>
                                        </td>
                                        <td><span className="badge bg-primary bg-opacity-10 text-primary">{user.student_id || 'N/A'}</span></td>
                                        <td className="small"><span className='badge bg-info text-dark'>{user.class_name || 'Not Set'}</span></td>
                                        <td>
                                            <span className={`badge ${
                                                user.role === 'student' ? 'bg-success' : 
                                                user.role === 'class rep' ? 'bg-warning text-black' : 'bg-secondary'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="pe-4 text-end">
                                            <div className='btn-group'>
                                                <button onClick={() => navigate(`/admin-edit-student-management/${user.id}`)} className="btn btn-sm btn-outline-secondary"><i className="bi bi-pencil-square"></i></button>
                                                <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-outline-danger" title='Delete User'><i className="bi bi-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <hr className="mx-3 my-5" />

                {/* --- ADMIN SECTION --- */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">System Administrators</h2>
                        <p className="text-muted small mb-0">Users with high-level access permissions</p>
                    </div>
                    <div className='d-flex'>
                        <div className="col-6 input-group shadow-sm me-2" style={{ width: '300px' }}>
                            <span className="input-group-text bg-white border-end-0"><i className="bi bi-shield-lock"></i></span>
                            <input type="text" className="form-control border-start-0" placeholder="Search Admins..." onChange={(e) => setAdminSearchTerm(e.target.value)} />
                        </div>
                        <div className="col-6 input-group">
                            <span className="input-group-text bg-primary border-0"><i className="bi bi-plus text-white"></i></span>
                            <button className='btn btn-primary border-start-0' onClick={() => navigate(`/add-admin`)}>Add Admin</button>
                        </div>
                    </div>


                </div>

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mx-3 border-top border-danger border-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th className="ps-4 py-3">Admin Name</th>
                                    <th>Email Address</th>
                                    <th>Created At</th>
                                    <th className="pe-4 text-end">Security</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                                ) : filteredAdmins.length > 0 ? (
                                    filteredAdmins.map((admin) => (
                                        <tr key={admin.id}>
                                            <td className="ps-4 fw-bold">{admin.name}</td>
                                            <td>{admin.email}</td>
                                            <td className="text-muted small">{new Date(admin.created_at).toLocaleDateString()}</td>
                                            <td className="pe-4 text-end">
                                                <span className="badge bg-danger">Administrator</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" className="text-center py-4 text-muted">No administrators found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default UserManagement;