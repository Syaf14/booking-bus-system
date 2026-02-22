import React from 'react'
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../global/AdminLayout';

function ReportNotificationManagement() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
        <div className='bg-white border-bottom border-3'style={{height:"20vh",width:"100%"}}>
            <div className='px-5 d-flex align-items-center h-100 w-100'>
                <h1 className='fw-bold'>Report & Notification</h1>
            </div>
        </div>
        <div>
          <table className='table table-bordered'>
                <thead className=''>
                    <tr>
                        <td className='' style={{width:"10vh"}}>
                            BUS CODE
                        </td>
                        <td>
                            BUS NAME
                        </td>
                        <td>
                            DEPARTURE
                        </td>
                        <td>
                            DESTINATION
                        </td>
                        <td>
                            DEPART TIME
                        </td>
                        <td>
                            ARRIVE TIME
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
    </AdminLayout>
  )
}

export default ReportNotificationManagement