
import JobsCard from "@/components/jobs/JobsCard";
import { getJobs } from "@/lib/api/jobs";

const jobData = {
  "jobTitle": "iOS Software Engineer",
  "jobCategory": "Mobile Development",
  "jobType": "Full-time",
  "minSalary": "7200",
  "maxSalary": "9800",
  "currency": "USD",
  "location": "Cupertino, California, USA",
  "responsibilities": "Develop and maintain iOS applications, integrate APIs, optimize app performance, and collaborate with designers.",
  "companyLogo": "https://i.ibb.co.com/Fbs74jTX/microsoft.png"
};

export default async function Page() {
    const jobs =await getJobs();

return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
      
      {/* 3-column grid layout */}
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {jobs && jobs.map ((jobsItem) => <JobsCard 
       key={jobsItem._id}
       job={jobsItem}
       ></JobsCard>

       )}
      </div>
    </div>
  );
}