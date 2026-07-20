
// import JobsCard from "@/components/jobs/JobsCard";
// import { getJobs } from "@/lib/api/jobs";

// export default async function JobsPage() {
//     const jobs =await getJobs();

// return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
      
//       {/* 3-column grid layout */}
//       <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//        {jobs && jobs.map ((jobsItem) => <JobsCard 
//        key={jobsItem._id}
//        job={jobsItem}
//        ></JobsCard>

//        )}
//       </div>
//     </div>
//   );
// }

import { getJobs } from "@/lib/api/jobs";
import JobFilterWrapper from "@/components/jobs/JobFilterWrapper";
import JobsCard from "@/components/jobs/JobsCard";

export default async function JobsPage() {
    const jobs = await getJobs();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
            {/* ডেটা এখানে পাস করে দেওয়া হচ্ছে */}
            
            <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs && jobs.map ((jobsItem) => <JobsCard key={jobsItem._id}
        job={jobsItem}
        ></JobsCard>

        )}
      </div>
        </div>
    );
}