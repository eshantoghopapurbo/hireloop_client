// import { getCompanyJobs } from '@/lib/api/jobs';
// import React from 'react';

// const RecruiterJobs = async() => {
//     const companyId ="comp_123456";
//     const jobs =await getCompanyJobs(companyId)
//     console.log("jobs for company", jobs);
//     return (
//         <div>
//             <h1 className='text-white text-2xl'>jobs/company </h1>
//         </div>
//     );
// };

// export default RecruiterJobs;

import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
// Gravity / Lucide Icons
import { Video, Edit3, Trash2 } from "lucide-react";

const RecruiterJobs = async () => {
    const companyId = 'comp_123456'; // todo
    const jobs = await getCompanyJobs(companyId) || [];
    console.log("jobs for company", jobs);

    return (
        <div className="w-full max-w-full p-4 md:p-6 space-y-4 bg-zinc-950 min-h-screen text-white overflow-x-auto">
            {/* Header Section */}
            <div className="flex flex-col gap-1 pb-4 border-b border-zinc-800">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    Recruiter/Company Manage All Jobs
                </h2>
                <p className="text-sm text-zinc-400">
                    View, edit, and manage your active job listings.
                </p>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto w-full">
                <Table
                    className={{
                        wrapper: "bg-zinc-900 border border-zinc-800 shadow-xl",
                        th: "bg-zinc-800 text-white font-semibold border-b border-zinc-700",
                        td: "text-zinc-200 border-b border-zinc-800/50 py-3"
                    }}
                >
                    <Table.ResizableContainer>
                        <Table.Content aria-label="Company jobs table" className="min-w-full">
                            <Table.Header>
                                <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={200}>
                                    Job Title
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.2fr" id="location" minWidth={120}>
                                    Location
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.5fr" id="salary" minWidth={150}>
                                    Salary
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.2fr" id="deadline" minWidth={130}>
                                    Deadline
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="status" minWidth={110}>
                                    Status
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.5fr" id="actions" minWidth={160}>
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body emptyContent={<p className="text-zinc-400 flex grid-cols-1 lg:grid-cols-5">No jobs found for this company.</p>}>
                                {jobs.map((job) => {
                                    const jobId = job._id?.$oid || job._id;

                                    return (
                                        <Table.Row key={jobId} className="hover:bg-zinc-800/40 transition-colors">
                                            {/* Job Title */}
                                            <Table.Cell>
                                                <span className="font-semibold text-white">{job.jobTitle}</span>
                                            </Table.Cell>

                                            {/* Location */}
                                            <Table.Cell className="capitalize text-zinc-300">
                                                {job.location} {job.isRemote && <span className="text-xs text-blue-400 ml-1 font-medium">(Remote)</span>}
                                            </Table.Cell>

                                            {/* Salary */}
                                            <Table.Cell className="text-zinc-300 font-medium">
                                                {job.minSalary && job.maxSalary
                                                    ? `${job.minSalary} - ${job.maxSalary} ${job.currency || 'USD'}`
                                                    : "Not Specified"
                                                }
                                            </Table.Cell>

                                            {/* Deadline */}
                                            <Table.Cell className="text-zinc-400">
                                                {job.deadline}
                                            </Table.Cell>

                                            {/* Status (Solid Bright Chips) */}
                                            <Table.Cell>
                                                <Chip
                                                    color={job.status === "active" ? "success" : "danger"}
                                                    size="sm"
                                                    variant="solid"
                                                    className="capitalize text-white font-semibold"
                                                >
                                                    {job.status || "Inactive"}
                                                </Chip>
                                            </Table.Cell>

                                            {/* Colorful Action Buttons */}
                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                                    <Tooltip content="Video Details" closeDelay={0}>
                                                        <Button
                                                            size="sm"
                                                            variant="solid"
                                                            color="primary"
                                                            className="font-medium text-white px-3"
                                                            startContent={<Video className="w-4 h-4" />}
                                                        >
                                                            Video
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Edit Job" closeDelay={0}>
                                                        <Button
                                                            size="sm"
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Delete Job" closeDelay={0}>
                                                        <Button
                                                            size="sm"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ResizableContainer>
                </Table>
            </div>
        </div>
    );
};

export default RecruiterJobs;



// import { getCompanyJobs } from '@/lib/api/jobs';
// import React from 'react';
// import { Table, Chip, Button, Tooltip } from "@heroui/react";
// import { Video, Edit3, Trash2 } from "lucide-react";

// const RecruiterJobs = async () => {
//     const companyId = 'comp_123456';
//     const jobs = await getCompanyJobs(companyId) || [];

//     return (
//         <div className="w-full max-w-full p-4 md:p-6 bg-zinc-950 min-h-screen text-white overflow-hidden">
//             {/* Header Section */}
//             <div className="flex flex-col gap-1 pb-6">
//                 <h2 className="text-2xl font-bold tracking-tight">Manage All Jobs</h2>
//                 <p className="text-sm text-zinc-400">View, edit, and manage your active job listings.</p>
//             </div>

//             {/* Table Section */}
//             <div className="w-full">
//                 <Table aria-label="Company jobs table">
//                     <Table.ScrollContainer>
//                         <Table.Content className="w-full min-w-[700px]">
//                             <Table.Header>
//                                 <Table.Column isRowHeader>Job Title</Table.Column>
//                                 <Table.Column>Location</Table.Column>
//                                 <Table.Column>Salary</Table.Column>
//                                 <Table.Column>Deadline</Table.Column>
//                                 <Table.Column>Status</Table.Column>
//                                 <Table.Column>Actions</Table.Column>
//                             </Table.Header>

//                             <Table.Body emptyContent="No jobs found for this company.">
//                                 {jobs.map((job) => {
//                                     const jobId = job._id?.$oid || job._id;
//                                     return (
//                                         <Table.Row key={jobId}>
//                                             <Table.Cell>
//                                                 <span className="font-semibold text-white">{job.jobTitle}</span>
//                                             </Table.Cell>
//                                             <Table.Cell>
//                                                 {job.location} {job.isRemote && <span className="text-white-400 text-xs ml-1">(Remote)</span>}
//                                             </Table.Cell>
//                                             <Table.Cell>
//                                                 {job.minSalary ? `${job.minSalary} - ${job.maxSalary} ${job.currency || 'USD'}` : "Not Specified"}
//                                             </Table.Cell>
//                                             <Table.Cell>{job.deadline}</Table.Cell>
//                                             <Table.Cell>
//                                                 <Chip color={job.status === "active" ? "success" : "danger"} size="sm">
//                                                     {job.status || "Inactive"}
//                                                 </Chip>
//                                             </Table.Cell>
//                                             <Table.Cell>
//                                                 <div className="flex items-center gap-2">
//                                                     <Tooltip content="Video Details">
//                                                         <Button size="sm" variant="flat" color="primary"><Video className="w-4 h-4" /></Button>
//                                                     </Tooltip>
//                                                     <Tooltip content="Edit">
//                                                         <Button size="sm" variant="flat"><Edit3 className="w-4 h-4" /></Button>
//                                                     </Tooltip>
//                                                     <Tooltip content="Delete">
//                                                         <Button size="sm" variant="flat" className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
//                                                     </Tooltip>
//                                                 </div>
//                                             </Table.Cell>
//                                         </Table.Row>
//                                     );
//                                 })}
//                             </Table.Body>
//                         </Table.Content>
//                     </Table.ScrollContainer>
//                 </Table>
//             </div>
//         </div>
//     );
// };

// export default RecruiterJobs;