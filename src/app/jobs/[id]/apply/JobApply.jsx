"use client";

import React, { useState } from 'react';
import { Form, TextField, Label, Input, TextArea, Button, Description } from '@heroui/react';
import { Paperclip, Note, User, Link as LinkIcon } from '@gravity-ui/icons';
import { submitApplication } from '@/lib/action/applications';
import { toast } from 'react-toastify';

const JobApply = ({ job, applicant }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);


        const submissionData = {
            jobId: job?._id,
            jobTitle: job?.jobTitle,
            jobCategory: job?.jobCategory,
            applicantId:applicant?.id,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            status: "applied",

            resumeLink: formData.get("resumeLink"),
            portfolio: formData.get("portfolio"),
            coverLetter: formData.get("coverLetter"),

        }

        console.log("Form Submitted", submissionData);

        const res = await submitApplication(submissionData);
        if (res.insertedId) {
            toast.success("application submit successfully")
            setFormData({ resumeLink: "", portfolio: "", coverLetter: "" })


            setTimeout(() => setIsLoading(false), 2000);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 mt-8 mb-8 bg-white  rounded-2xl shadow-sm border border-zinc-200 ">
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-500">Apply for {job.jobTitle}</h1>
                <p className="text-zinc-500 text-small">Please fill out the form below to submit your application.</p>
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Full Name */}
                <TextField isRequired name="fullName">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter your full name"
                        className="bg-white text-black"
                    />
                </TextField>

                {/* Resume Link */}
                <TextField isRequired name="resumeLink">
                    <Label>Resume Link</Label>
                    <Input
                        type="url"
                        placeholder="https://drive.google.com/file/..."
                        className="bg-white text-black"

                    />
                    <Description>Please provide a public link to your resume.</Description>
                </TextField>

                {/* Portfolio / Website (Optional) */}
                <TextField name="portfolio">
                    <Label>Portfolio Website (Optional)</Label>
                    <Input placeholder="https://yourportfolio.com"
                        className="bg-white text-black"

                    />
                </TextField>

                {/* Cover Letter (Optional) */}
                <TextField name="coverLetter">
                    <Label>Cover Letter (Optional)</Label>
                    <TextArea placeholder="Tell us why you are a good fit..."
                        className="bg-white text-black"

                    />
                </TextField>

                <div className="flex gap-2 mt-4">
                    <Button
                        type="submit"
                        color="primary"
                        className="flex-1"
                        isLoading={isLoading}
                    >
                        Submit Application
                    </Button>
                    <Button type="reset" variant="flat">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default JobApply;