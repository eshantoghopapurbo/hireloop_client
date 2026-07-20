import { Button, Chip, Card, CardHeader } from "@heroui/react";
import { getJobsId } from '@/lib/api/jobs';
import { Pin, Briefcase, Ban, Calendar, Check } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

export default async function JobDetailsPage({ params }) {
    const { id } = await params;
    const job = await getJobsId(id);

    if (!job) return <div className="p-10 text-center">Job not found!</div>;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* Header Section */}
            <Card className="bg-[#121212] text-white border border-gray-800 mb-6">
                <CardHeader className="flex gap-4 p-6">
                    <Image
                        alt={job.jobTitle}
                        height={80}
                        src={job.companyLogo || "/placeholder.png"}
                        width={80}
                        className="rounded-xl border border-gray-700"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{job.jobTitle}</h1>
                        <p className="text-gray-400">{job.jobCategory} • {job.isRemote ? "Remote" : "On-site"}</p>
                    </div>
                </CardHeader>
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
                        <Pin size={16} />
                        {job.location}
                    </div>

                    <div className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
                        <Briefcase size={16} />
                        {job.jobType}
                    </div>

                    <div className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
                        <Ban size={16} />
                        {job.minSalary}-{job.maxSalary} {job.currency}
                    </div>

                    <div className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
                        <Calendar size={16} />
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </div>
                </div>
            </Card>

            {/* Content Section */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <section>
                        <h2 className="text-xl font-bold mb-2">Responsibilities</h2>
                        <p className="text-gray-500 leading-relaxed">{job.responsibilities}</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold mb-2">Requirements</h2>
                        <p className="text-gray-500">{job.requirements}</p>
                    </section>
                </div>

                <div className="bg-[#121212] p-6 rounded-xl border border-gray-800 h-fit">
                    <h2 className="text-lg font-bold mb-4">Benefits</h2>
                    <ul className="space-y-2 text-gray-300">
                        {job.benefits.split(',').map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <Check size={18} className="text-green-500" /> {item.trim()}
                            </li>
                        ))}
                    </ul>
                    <Link
                        className="w-full block text-center bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300
                         py-3 px-6 rounded-lg font-bold mt-8"
                        href={`/jobs/${id}/apply`}
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
}