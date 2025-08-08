'use client'
import Link from 'next/link'
import React, { useEffect, useState } from "react";

type Application = {
    id: string,
    status: string,
    applicant_name: string,
    assign_reviewer_name: string,
}   

type Response = {
  "success": boolean,
  "data": {
    "applications": Application[]
    "total_count": number
    "page": number
    "limit": number
  },
  "message": "string"
}
const AllApplication = () => {

    useEffect(() => {
            const fetchApplications = async () => {
                const baseUrl = process.env.API_BASE
                try {
                    const response = await fetch(`${baseUrl}/managers/applications?status=efjg&`);
                    const result: Response = await response.json();
                    console.log(result);
                    if (result.success) {
                        setApplications(result.data.applications);
                    }
                } catch (error) {
                    console.error("Error fetching applications:", error);
                }
            };
    
            fetchApplications();
        }, []);

    const [applications, setApplications] = useState<Application[]>([]);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [actionDropdownOpen, setActionDropdownOpen] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('Filter by Status');

    
    return (
        <div className="mt-8 ml-24 bg-white px-4 py-5">
            <div className="flex justify-between mb-3">
                <h2 className="text-black font-bold">All Application</h2>
                <div className="relative inline-block text-left">
                    <button
                        onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                        className="inline-flex items-center bg-gray-100 px-2 py-2 border border-gray-300 rounded hover:bg-gray-200 focus:outline-none"
                    >
                        {selectedStatus}
                        <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {statusDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                            {['New', 'Underreview', 'InterviewStage', 'Accepted'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setSelectedStatus(status);
                                        setStatusDropdownOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <table className=''>
                <thead className='border-b border-gray-500'>
                    <tr className="text-gray-600 gap-6">
                        <th className="pr-12 text-[11px]">APPLICANT</th>
                        <th className="pr-12 text-[11px]">STATUS</th>
                        <th className="pr-12 text-[11px]">ASSIGNED REVIEWER</th>
                        <th className="pr-12 text-[11px]">ACTION</th>
                    </tr>
                </thead>
                <tbody className='border-b border-gray-500'>
                    {applications.map((app, index) => (
                        <tr key={app.id} className="ml-16 h-16">
                            <td className="text-black pr-10">{app.applicant_name}</td>
                            <td className='pr-12'>
                                <span className="inline-flex mr-10 bg-yellow-300 text-black px-2 py-1 rounded">
                                    {app.status}
                                </span>
                            </td>
                            <td className="pr-16">
                                <span className="inline-block pr-[30px] rounded-[3px] bg-gray-100 text-gray-400 border border-gray-200">
                                    {app.assign_reviewer_name || 'Unassigned'}
                                </span>
                            </td>
                            <td className="pr-12 relative">
                                <div className="inline-block text-left">
                                    <button
                                        onClick={() => setActionDropdownOpen(actionDropdownOpen === index ? null : index)}
                                        className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200 inline-flex items-center"
                                    >
                                        Action
                                        <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {actionDropdownOpen === index && (
                                        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-20">
                                            <button
                                                onClick={() => setActionDropdownOpen(null)}
                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                            >
                                                Review
                                            </button>
                                            <button
                                                onClick={() => setActionDropdownOpen(null)}
                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                            >
                                                <Link href={"/VeiwDetails"} > View Details </Link> 
                                            </button>

                                            <div className="relative group">
                                                <button
                                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex justify-between items-center"
                                                >
                                                    Assign to Reviewer
                                                    <span className="ml-2">{'>'}</span>
                                                </button>
                                                <div className="absolute left-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-30">
                                                    <div className="block w-full px-4 py-2 text-left text-gray-400 text-sm border-b border-gray-100 cursor-default">
                                                        Search for Reviewer
                                                    </div>
                                                    {["Jane R.", "John D."].map((reviewer) => (
                                                        <button
                                                            key={reviewer}
                                                            onClick={() => {
                                                                console.log("Assigned to:", reviewer);
                                                                setActionDropdownOpen(null);
                                                            }}
                                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                        >
                                                            {reviewer}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllApplication;



