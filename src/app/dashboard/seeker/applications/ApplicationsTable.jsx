// import { getApplicantionsByApplicant } from '@/lib/api/applications';
// import { getUserSession } from '@/lib/core/session';
// import { Table } from '@heroui/react';
// import React from 'react';

// const ApplicationsTable =  ({jobs}) => {

//     return (
//         <div className="p-6 bg-[#121212] min-h-screen text-white">
//             {/* Header Section matching the screenshot */}
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
//                 <button className="text-sm text-gray-400 hover:text-white transition-colors">
//                     View all
//                 </button>
//             </div>

//             {/* Table wrapper matching Hero UI 3.1.0 specifications */}
//             <Table className="bg-transparent shadow-none">
//                 <Table.ScrollContainer>
//                     <Table.Content aria-label="Recent Applications Table" className="border-collapse">
//                         <Table.Header className="border-b border-neutral-800 text-gray-400 text-sm font-medium">
//                             <Table.Column className="py-3 px-4 text-left">Candidate Name</Table.Column>
//                             <Table.Column className="py-3 px-4 text-left">Role</Table.Column>
//                             <Table.Column className="py-3 px-4 text-left">Date Applied</Table.Column>
//                             <Table.Column className="py-3 px-4 text-left">Category</Table.Column>
//                             <Table.Column className="py-3 px-4 text-left">Status</Table.Column>
//                         </Table.Header>
//                         <Table.Body>
//                             {jobs.map((job) => {
//                                 // Formatting the date from MongoDB $date string e.g., "2026-07-17T05:33:55.823Z"
//                                 const formattedDate = job.createdAt?.$date
//                                     ? new Date(job.createdAt.$date).toLocaleDateString('en-US', {
//                                         month: 'short',
//                                         day: 'numeric',
//                                         year: 'numeric'
//                                     })
//                                     : 'N/A';

//                                 return (
//                                     <Table.Row
//                                         key={job._id}
//                                         className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors"
//                                     >
//                                         {/* Candidate Name with Avatar Placeholder */}
//                                         <Table.Cell className="py-4 px-4">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 font-medium text-sm flex-shrink-0">
//                                                     {job.applicantName ? job.applicantName.charAt(0).toUpperCase() : 'A'}
//                                                 </div>
//                                                 <span className="font-medium text-white">{job.applicantName}</span>
//                                             </div>
//                                         </Table.Cell>

//                                         {/* Role / Job Title */}
//                                         <Table.Cell className="py-4 px-4 text-gray-300">
//                                             {job.jobTitle}
//                                         </Table.Cell>

//                                         {/* Date Applied */}
//                                         <Table.Cell className="py-4 px-4 text-gray-400">
//                                             {formattedDate}
//                                         </Table.Cell>

//                                         {/* Category (mapping to experience/category column slot) */}
//                                         <Table.Cell className="py-4 px-4 text-gray-300">
//                                             {job.jobCategory}
//                                         </Table.Cell>

//                                         {/* Status Badge */}
//                                         <Table.Cell className="py-4 px-4">
//                                             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
//                                                 Reviewing
//                                             </span>
//                                         </Table.Cell>
//                                     </Table.Row>
//                                 );
//                             })}
//                         </Table.Body>
//                     </Table.Content>
//                 </Table.ScrollContainer>
//                 <Table.Footer />
//             </Table>
//         </div>
//     );
// };

// export default ApplicationsTable;


import { getApplicantionsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import { Table } from '@heroui/react';
import React from 'react';

const ApplicationsPage = async () => {
    const user = await getUserSession();
    const jobs = await getApplicantionsByApplicant(user.id);
    return (
        <div className="p-6 bg-[#121212] min-h-screen text-white">
            {/* Header Section matching the screenshot */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    View all
                </button>
            </div>
            {/* Table wrapper matching Hero UI 3.1.0 specifications */}
            <Table className="bg-transparent shadow-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Recent Applications Table" className="border-collapse">
                        <Table.Header className="border-b border-neutral-800 text-gray-400 text-sm font-medium">
                            <Table.Column isRowHeader className="py-3 px-4 text-left">Candidate Name</Table.Column>
                            <Table.Column className="py-3 px-4 text-left">Role</Table.Column>
                            <Table.Column className="py-3 px-4 text-left">Date Applied</Table.Column>
                            <Table.Column className="py-3 px-4 text-left">Category</Table.Column>
                            <Table.Column className="py-3 px-4 text-left">Status</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {jobs.map((job) => {
                                // Formatting the date from MongoDB $date string e.g., "2026-07-17T05:33:55.823Z"
                                const formattedDate = job.createdAt?.$date
                                    ? new Date(job.createdAt.$date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })
                                    : 'N/A';

                                return (
                                    <Table.Row
                                        key={job._id}
                                        className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors"
                                    >
                                        {/* Candidate Name with Avatar Placeholder */}
                                        <Table.Cell className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 font-medium text-sm flex-shrink-0">
                                                    {job.applicantName ? job.applicantName.charAt(0).toUpperCase() : 'A'}
                                                </div>
                                                <span className="font-medium text-white">{job.applicantName}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Role / Job Title */}
                                        <Table.Cell className="py-4 px-4 text-gray-300">
                                            {job.jobTitle}
                                        </Table.Cell>

                                        {/* Date Applied */}
                                        <Table.Cell className="py-4 px-4 text-gray-400">
                                            {formattedDate}
                                        </Table.Cell>

                                        {/* Category */}
                                        <Table.Cell className="py-4 px-4 text-gray-300">
                                            {job.jobCategory}
                                        </Table.Cell>

                                        {/* Status Badge */}
                                        <Table.Cell className="py-4 px-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                                                Applied
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer />
            </Table>
        </div>
    );
};

export default ApplicationsPage;