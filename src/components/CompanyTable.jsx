// 'use client';

// import React from 'react';
// import { Table } from '@heroui/react';
// import Image from 'next/image';
// import { updateCompany } from '@/lib/action/companies';

// export default function CompanyTable({ companies }) {
//     const handleApprove = async (id) => {
//         const result = await updateCompany(id, { status: "Approved" })
//         if (result.modifiedCount) {
//             console.log("Approved company ID:", id, result);
//         }
//     };

//     const handleReject = (companyId) => {
//         console.log("Rejected company ID:", companyId);
//         // এখানে আপনার রিজেক্ট করার API কল বা লজিক বসাবেন
//     };

//     return (
//         <Table className="bg-transparent shadow-none">
//             <Table.ScrollContainer>
//                 <Table.Content aria-label="Companies for Review Table" className="border-collapse">
//                     <Table.Header className="border-b border-neutral-800 text-gray-400 text-sm font-medium">
//                         <Table.Column isRowHeader className="py-3 px-4 text-left">Company Name</Table.Column>
//                         <Table.Column className="py-3 px-4 text-left">Recruiter Email</Table.Column>
//                         <Table.Column className="py-3 px-4 text-left">Industry</Table.Column>
//                         <Table.Column className="py-3 px-4 text-left">Status</Table.Column>
//                         <Table.Column className="py-3 px-4 text-left">Date Submitted</Table.Column>
//                         <Table.Column className="py-3 px-4 text-right">Actions</Table.Column>
//                     </Table.Header>
//                     <Table.Body>
//                         {companies.map((company) => {
//                             const companyName = company.companyName || 'Company';
//                             const initials = companyName
//                                 .split(' ')
//                                 .map((n) => n[0])
//                                 .join('')
//                                 .substring(0, 2)
//                                 .toUpperCase();

//                             const companyId = company._id?.$oid || company._id;

//                             return (
//                                 <Table.Row
//                                     key={companyId}
//                                     className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors"
//                                 >
//                                     {/* Company Name with Logo Avatar */}
//                                     <Table.Cell className="py-4 px-4">
//                                         <div className="flex items-center gap-3">
//                                             {company.logo ? (
//                                                 <Image
//                                                     src={company.logo}
//                                                     alt={companyName}
//                                                     width={30}
//                                                     height={30}
//                                                     className="w-9 h-9 rounded-md object-cover bg-neutral-800 flex-shrink-0"
//                                                 />
//                                             ) : (
//                                                 <div className="w-9 h-9 rounded-md bg-neutral-800 flex items-center justify-center text-gray-300 font-medium text-xs flex-shrink-0">
//                                                     {initials}
//                                                 </div>
//                                             )}
//                                             <span className="font-medium text-white">{companyName}</span>
//                                         </div>
//                                     </Table.Cell>

//                                     {/* Recruiter Email */}
//                                     <Table.Cell className="py-4 px-4 text-gray-300 text-sm">
//                                         {company.recruiterEmail || `recruiter@${companyName.toLowerCase().replace(/\s+/g, '')}.io`}
//                                     </Table.Cell>

//                                     {/* Industry Badge */}
//                                     <Table.Cell className="py-4 px-4">
//                                         <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700/50">
//                                             {company.industry || 'General'}
//                                         </span>
//                                     </Table.Cell>

//                                     {/* Status */}
//                                     <Table.Cell className=" text-blue-500 py-4 px-4">
//                                         <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${company.status === 'approved' ? 'text-emerald-400' : 'text-amber-400'
//                                             }`}>
//                                             <span className={`w-1.5 h-1.5 rounded-full ${company.status === 'approved' ? 'bg-emerald-400' : 'bg-amber-400'
//                                                 }`}></span>
//                                             {company.status === 'approved' ? 'Approved' : 'Pending'}
//                                         </span>
//                                     </Table.Cell>

//                                     {/* Date Submitted */}
//                                     <Table.Cell className="py-4 px-4 text-gray-400 text-sm">
//                                         Oct 14, 2023
//                                     </Table.Cell>

//                                     {/* Actions Buttons */}
//                                     <Table.Cell className="py-4 px-4 text-right">
//                                         <div className="flex items-center justify-end gap-2">
//                                             {company.status?.toLowerCase() !== "approved" && (
//                                                 <button
//                                                     onClick={() => handleApprove(companyId)}
//                                                     className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60 transition-colors"
//                                                 >
//                                                     Approve
//                                                 </button>
//                                             )}
//                                             {company.status?.toLowerCase() !== "reject" && (
//                                                 <button
//                                                     onClick={() => handleReject(companyId)}
//                                                     className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60 transition-colors"
//                                                 >
//                                                     Reject
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </Table.Cell>
//                                 </Table.Row>
//                             );
//                         })}
//                     </Table.Body>
//                 </Table.Content>
//             </Table.ScrollContainer>

//             {/* Footer with pagination style matching screenshot */}
//             <Table.Footer className="py-4 px-4 flex justify-between items-center text-xs text-gray-400 border-t border-neutral-800">
//                 <span>Showing 1-{companies.length} of {companies.length} companies</span>
//                 <div className="flex items-center gap-1">
//                     <button className="px-2.5 py-1 rounded bg-neutral-800 text-gray-300 hover:bg-neutral-700">&lt;</button>
//                     <button className="px-2.5 py-1 rounded bg-neutral-700 text-white font-medium">1</button>
//                     <button className="px-2.5 py-1 rounded bg-neutral-800 text-gray-300 hover:bg-neutral-700">2</button>
//                     <button className="px-2.5 py-1 rounded bg-neutral-800 text-gray-300 hover:bg-neutral-700">3</button>
//                     <button className="px-2.5 py-1 rounded bg-neutral-800 text-gray-300 hover:bg-neutral-700">&gt;</button>
//                 </div>
//             </Table.Footer>
//         </Table>
//     );
// }


'use client';

import React from 'react';
import { Table } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ১. রাউটার ইম্পোর্ট করুন
import { updateCompany } from '@/lib/action/companies';

export default function CompanyTable({ companies }) {
    const router = useRouter(); // ২. রাউটার ইনিশিয়ালাইজ করুন

    const handleApprove = async (id) => {
        const result = await updateCompany(id, { status: "Approved" })
        if (result.modifiedCount || result.success) {
            console.log("Approved company ID:", id, result);
            router.refresh(); 
        }
    };

    const handleReject = async (id) => {
        const result = await updateCompany(id, { status: "Rejected" }); 
        if (result.modifiedCount || result.success) {
            console.log("Rejected company ID:", id);
            router.refresh();
        }
    };

    return (
        <Table className="bg-transparent shadow-none">
            <Table.ScrollContainer>
                <Table.Content aria-label="Companies for Review Table" className="border-collapse">
                    <Table.Header className="border-b border-neutral-800 text-gray-400 text-sm font-medium">
                        <Table.Column isRowHeader className="py-3 px-4 text-left">Company Name</Table.Column>
                        <Table.Column className="py-3 px-4 text-left">Recruiter Email</Table.Column>
                        <Table.Column className="py-3 px-4 text-left">Industry</Table.Column>
                        <Table.Column className="py-3 px-4 text-left">jobs Count</Table.Column>
                        <Table.Column className="py-3 px-4 text-left">Status</Table.Column>
                        <Table.Column className="py-3 px-4 text-left">Date Submitted</Table.Column>
                        <Table.Column className="py-3 px-4 text-right">Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {companies.map((company) => {
                            const companyName = company.companyName || 'Company';
                            const initials = companyName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .substring(0, 2)
                                .toUpperCase();

                            const companyId = company._id?.$oid || company._id;
                            const currentStatus = company.status?.toLowerCase();
                            const isApproved = currentStatus === 'approved';

                            return (
                                <Table.Row
                                    key={companyId}
                                    className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors"
                                >
                                    {/* Company Name */}
                                    <Table.Cell className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            {company.logo ? (
                                                <Image
                                                    src={company.logo}
                                                    alt={companyName}
                                                    width={30}
                                                    height={30}
                                                    className="w-9 h-9 rounded-md object-cover bg-neutral-800 flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-9 h-9 rounded-md bg-neutral-800 flex items-center justify-center text-gray-300 font-medium text-xs flex-shrink-0">
                                                    {initials}
                                                </div>
                                            )}
                                            <span className="font-medium text-white">{companyName}</span>
                                        </div>
                                    </Table.Cell>

                                    {/* Recruiter Email */}
                                    <Table.Cell className="py-4 px-4 text-gray-300 text-sm">
                                        {company.recruiterEmail || `recruiter@${companyName.toLowerCase().replace(/\s+/g, '')}.io`}
                                    </Table.Cell>

                                    {/* Industry Badge */}
                                    <Table.Cell className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                                            {company.industry || 'General'}
                                        </span>
                                    </Table.Cell>
                                    {/* sfsddfsds */}
                                    <Table.Cell className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                                                {company.jobCount || 'General'}
                                        </span>
                                    </Table.Cell>

                                    {/* Status (Fixed with dynamic check) */}
                                    <Table.Cell className="py-4 px-4 text-blue-600">
                                        <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${isApproved ? 'text-emerald-400' : 'text-amber-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isApproved ? 'bg-emerald-400' : 'bg-amber-400'
                                                }`}></span>
                                            {isApproved ? 'Approved' : 'Pending'}
                                        </span>
                                    </Table.Cell>

                                    {/* Date Submitted */}
                                    <Table.Cell className="py-4 px-4 text-gray-400 text-sm">
                                        Oct 14, 2023
                                    </Table.Cell>

                                    {/* Actions Buttons */}
                                    <Table.Cell className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {!isApproved && (
                                                <button
                                                    onClick={() => handleApprove(companyId)}
                                                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {currentStatus !== 'rejected' && (
                                                <button
                                                    onClick={() => handleReject(companyId)}
                                                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-950/60 text-red-400 border border-red-800/50 hover:bg-red-900/60 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>

            <Table.Footer className="py-4 px-4 flex justify-between items-center text-xs text-gray-400 border-t border-neutral-800">
                <span>Showing 1-{companies.length} of {companies.length} companies</span>
                <div className="flex items-center gap-1">
                    <button className="px-2.5 py-1 rounded bg-neutral-800 text-gray-300 hover:bg-neutral-700">&lt;</button>
                    <button className="px-2.5 py-1 rounded bg-neutral-700 text-white font-medium">1</button>
                    <button className="px-2.5 py-1 rounded bg-neutral-800 text-gray-300 hover:bg-neutral-700">&gt;</button>
                </div>
            </Table.Footer>
        </Table>
    );
}