import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../global/AdminLayout';

function UserManagement() {
    const navigate = useNavigate();
  return (
    <AdminLayout>
        <div className='bg-white border-bottom border-3 mb-2'style={{height:"20vh",width:"100%"}}>
            <div className='px-5 d-flex align-items-center h-100 w-100'>
                <h1 className='fw-bold'>User Management</h1>
            </div>
        </div>
        <div className='card'>
            <div className="card-body">
                <table className='table table-bordered'>
                    <thead className=''>
                        <tr>
                            <td className='' style={{width:"10vh"}}>
                                ID
                            </td>
                            <td>
                                ROLE
                            </td>
                            <td>
                                FULL_NAME
                            </td>
                            <td>
                                EMAIL
                            </td>
                            <td>
                                STUDENT_ID
                            </td>
                            <td>
                                PHONE_NO
                            </td> 
                            <td>
                                ACTION
                            </td>                       
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>                
            </div>
        </div>
    </AdminLayout>
  )
}

export default UserManagement