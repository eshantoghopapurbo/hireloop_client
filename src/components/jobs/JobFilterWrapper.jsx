"use client";
import { useState } from "react";
import JobsCard from "@/components/jobs/JobsCard";
import JobSearchFilter from "./JobSearchFilter";

export default function JobFilterWrapper({ initialJobs }) {
    const [filters, setFilters] = useState({ search: "", category: "" });

    const filteredJobs = initialJobs.filter((job) => {
        const matchesSearch = job.jobTitle.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category ? job.jobCategory === filters.category : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* <JobSearchFilter onFilterChange={(newF) => setFilters(prev => ({ ...prev, ...newF }))} /> */}
            <JobSearchFilter
                filters={filters} // এই লাইনটি যোগ করুন
                onFilterChange={(newF) => setFilters(prev => ({ ...prev, ...newF }))}
            />
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <JobsCard key={job._id?.$oid || job._id} job={job} />
                ))}
            </div>
        </>
    );
}