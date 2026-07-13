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
     <div className="p-8 bg-zinc-950 min-h-screen flex justify-center items-center">
      <h2 className="text-red-500">{jobs.length}</h2>
      <JobsCard job={jobs[15]} />
     </div>
  );
}