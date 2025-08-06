
import React from 'react'

const AllApplication = () => {
  return (
    <div className="mt-8 w-100" >
        <div className=" flex direction-row justify-between">
            <h2 className="text-black">All Appliication</h2>
            <p className="text-gray-500 ">Filter by Status</p>
        </div>
        <table>
            <thead className='border-b'>
                <tr className=" text-gray-600 ml-15 " >
                    <th>APPLICANT</th>
                    <th>SUBMITTED</th>
                    <th>ASSIGNED REVIWER</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody className='border-b'> 
                <tr className="ml-15 " >
                    <td> Abel Tadesse </td>
                    <td> oct 26 , 2023</td>
                    <td> Jane R.</td>
                    <td> UnderReview</td>
                    <td> Action</td>
                </tr>

                <tr className="ml-15">
                    <td>bethlehe Tadesse</td>
                    <td>oct 25, 2023</td>
                    <td>Not Assigned</td>
                    <td>New</td>
                    <td>Action</td>
                </tr>
            </tbody>
            
        </table>

    </div>
  );
}

export default AllApplication;
