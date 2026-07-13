import { Card, CardHeader, CardFooter, Button, Chip } from "@heroui/react";
import { Pin, Briefcase, Ban, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

export default function JobsCard({ job }) {
    const hasImage = job.companyLogo && job.companyLogo.trim() !== "";
    return (
        <Card className="container mx-auto max-w-[400px] bg-[#121212] text-white p-4 border border-gray-800 m-1">
            <CardHeader className="flex gap-4">
                {hasImage && (
                    <Image
                        alt={job.jobTitle}
                        height={50}
                        src={job.companyLogo}
                        width={50}
                        className="rounded-xl"
                    />
                )}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">{job.jobTitle}</h2>
                    <p className="text-sm text-gray-400">{job.jobCategory}</p>
                </div>
            </CardHeader>

            {/* CardBody এর পরিবর্তে এখানে div ব্যবহার করা হয়েছে */}
            <div className="p-3">
                <div className="flex flex-wrap gap-2 mb-4">
                    {/* Location */}
                    <div className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
                        <Pin size={16} />
                        <span>{job.location}</span>
                    </div>

                    {/* Job Type */}
                    <div className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
                        <Briefcase size={16} />
                        <span>{job.jobType}</span>
                    </div>

                    {/* Salary */}
                    <div className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
                        <Ban size={16} />
                        <span>{job.minSalary}-{job.maxSalary} {job.currency}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {job.responsibilities}
                </p>
            </div>

            <CardFooter className="pt-4 border-t border-gray-800">
                <Button
                    as="a"
                    href={`/apply/${job._id?.$oid || ""}`}
                    className="text-white font-semibold p-0 bg-transparent hover:opacity-80 transition-opacity"
                    endContent={<ArrowRight size={20} />}
                >
                    Apply Now
                </Button>
            </CardFooter>
        </Card>
    );
}