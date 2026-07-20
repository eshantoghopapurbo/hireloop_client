// import { getJobsId } from '@/lib/api/jobs';
// import { getUserSession } from '@/lib/core/session';
// import { redirect } from 'next/navigation';
// import React from 'react';
// import JobApply from './JobApply';
// import { getApplicantionsByApplicant } from '@/lib/api/applications';
// import Link from 'next/link';

// const ApplyPage = async ({params}) => {
//     const {id}= await params;   
//     const user =await getUserSession();
//     if(!user){
//         redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
//     }
//      console.log("users singup page",user)
//      if(user.role !== "seeker"){
//         return(
//             <div className='flex flex-col items-center justify-center h-screen'>
//                 <p className='text-zinc-400 text-lg'>only job seekers can apply for this job position. please sign up as a job seeker to apply for this position. </p>
//             </div>
//         )
//      }

//      const applications = await getApplicantionsByApplicant(user.id);
//      const plan ={
//         name:"Free",
//         maxApplicationsPerMonth:3
//      }
//      const job = await getJobsId(id);

//     return (
//         <div>
//             <h1>You have applied so far: {applications.length} out of {plan.maxApplicationsPerMonth} this Month</h1>
//             <p>purchase a view plans.<Link href="plan"> plans view.</Link></p>
//              {applications.length <plan.maxApplicationsPerMonth && (
//                 <JobApply applicant={user} job={job}></JobApply>
//              )}
//         </div>
//     );
// };
// export default ApplyPage;


import { getJobsId } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicantionsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';
import { Card, CardHeader, ProgressBar, Button } from "@heroui/react";
import { div } from 'motion/react-client';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-center px-4'>
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className='text-zinc-400'>Only job seekers can apply. Please sign up as a job seeker.</p>
      </div>
    );
  }

  const applications = await getApplicantionsByApplicant(user.id);
  const plan = await getPlanById (user?.plan || "seeker_free")
  
  const job = await getJobsId(id);
  
   const applicationsCount = applications?.length || 0;
   const hasReachedLimit =applicationsCount >= plan.maxApplicationsPerMonth;
   const progressValue =Math.min((applicationsCount / plan.maxApplicationsPerMonth) *100, 100);

  // const progressValue = Math.min((applications.length / plan.maxApplicationsPerMonth) * 100, 100);

  return (
    <div className="container mx-auto px-6 pb-8 pt-4 mb-8 space-y-6">
      {/* Status Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-400 font-medium">Monthly Quota</span>
          <span className={`font-bold ${applications.length >= plan.maxApplicationsPerMonth ? "text-red-500" : "text-emerald-400"}`}>
            {applications.length} / {plan.maxApplicationsPerMonth} Applications
          </span>
        </div>

        <ProgressBar
          aria-label="Application progress"
          value={progressValue}
          className="max-w-full"
          classNames={{
            track: "bg-zinc-800",
            indicator: `${applications.length >= plan.maxApplicationsPerMonth ? "bg-red-500" : "bg-blue-500"}`,
          }}
        />
      </div>

      {/* Improved Conditional Messaging */}
      {applications.length >= plan.maxApplicationsPerMonth ? (
        <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-center
     backdrop-blur-sm">
          <h3 className="text-white font-semibold mb-1">Limit Reached</h3>
          <p className="text-zinc-400 text-sm mb-4">You have exhausted your monthly application quota.</p>
          <Link
            href="/plans"
            color="danger"
            variant="solid"
            className="font-bold"
          >
             View Plans
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl">
          <p className="text-zinc-300 text-sm mb-4">You have <span className="text-white font-bold">{plan.maxApplicationsPerMonth - applications.length}</span> applications left this month.</p>
          <div className="mt-4">
            <JobApply applicant={user} job={job} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyPage;