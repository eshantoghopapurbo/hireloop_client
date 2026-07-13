
"use client";

import React, { useState } from 'react';
import {
    Form,
    Fieldset,
    TextField,
    Select,
    ListBox,
    Label,
    Button,
} from "@heroui/react";
import { toast } from "react-toastify";
import { Xmark } from '@gravity-ui/icons';
import { createJob } from '@/lib/action/jobs';
import { redirect } from 'next/navigation';

export default function PostJobForm({ company }) {
    // const autoFilledCompany = {
    //     id: "comp_123456",
    //     name: "HireLoop Tech Ltd.",
    //     status: "Approved"
    // };

    const initialFormState = {
        jobTitle: '',
        jobCategory: '',
        jobType: '',
        minSalary: '',
        maxSalary: '',
        currency: 'USD',
        location: '',
        isRemote: false,
        deadline: '',
        responsibilities: '',
        requirements: '',
        benefits: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSelectChange = (name, keys) => {
        // keys null বা undefined কিনা তা চেক করে নিরাপদভাবে ভ্যালু নেওয়া
        const selectedKey = keys && Object.keys(keys).length > 0 ? Array.from(keys)[0] : "";

        setFormData(prev => ({ ...prev, [name]: selectedKey }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const toggleRemote = () => {
        setFormData(prev => ({
            ...prev,
            isRemote: !prev.isRemote,
            location: !prev.isRemote ? 'Remote' : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!formData.jobCategory) newErrors.jobCategory = "Category is required";
        if (!formData.jobType) newErrors.jobType = "Job type is required";
        if (!formData.location && !formData.isRemote) newErrors.location = "Location is required";
        if (!formData.responsibilities) newErrors.responsibilities = "Responsibilities are required";
        if (!formData.requirements) newErrors.requirements = "Requirements are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        };

        const finalPayload = {
            ...formData,
            companyId: company._id,
            companyName: company.name,
            companyLogo: company.logo,
            status: 'active',
            isPubliclyVisible: true,
        };
        // console.log("Submitting job post:", finalPayload);

        const res = await createJob(finalPayload);
        if (res?.insertedId) {
            // কন্ট্রোলড ফর্ম স্টেট এবং ভুলগুলো রিসেট করা হলো
            setFormData(initialFormState);
            setErrors({});
            toast.success("Job Created Successfully!");
            redirect("/dashboard/recruiter/jobs");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-3xl bg-[#121214] border border-neutral-800 rounded-xl shadow-xl overflow-hidden">

                {/* হেডার */}
                <div className="p-6 border-b border-neutral-800 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Post a New Job</h2>
                        <p className="text-sm text-neutral-400 mt-1">Enter details to start hiring on HireLoop.</p>
                    </div>
                    <button type="button" className="text-neutral-400 hover:text-white transition">
                        <Xmark className="w-5 h-5" />
                    </button>
                </div>

                {/* কোম্পানি ইনফো বার */}
                <div className="mx-6 mt-6 p-3 bg-neutral-900 border border-neutral-800 rounded-lg flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-neutral-400">Posting as: <strong className="text-white">{company.name}</strong></span>
                    </div>
                    <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50">
                        {company.status}
                    </span>
                </div>

                {/* Form শুরু */}
                <Form onSubmit={handleSubmit} className="p-6 space-y-8">

                    {/* ================= JOB INFO SECTION ================= */}
                    <Fieldset className="space-y-4">
                        <Fieldset.Legend className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                            Job Information
                        </Fieldset.Legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Job Title */}
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Job Title</Label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder="e.g. Senior Frontend Engineer"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className={`w-full bg-[#18181b] border ${errors.jobTitle ? 'border-red-500' : 'border-neutral-800'} focus:border-neutral-600 rounded-xl px-3 h-[48px] text-white text-sm outline-none transition placeholder:text-neutral-600`}
                                />
                                {errors.jobTitle && <p className="text-xs text-red-500 mt-1 pl-1">{errors.jobTitle}</p>}
                            </div>

                            {/* Job Category */}
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Job Category</Label>
                                <Select
                                    placeholder="Select Category"
                                    selectedKeys={formData.jobCategory ? [formData.jobCategory] : []}
                                    onSelectionChange={(keys) => handleSelectChange("jobCategory", keys)}
                                >
                                    <Select.Trigger className={`bg-[#18181b] border ${errors.jobCategory ? 'border-red-500' : 'border-neutral-800'} text-white h-[48px] rounded-xl px-3 flex items-center justify-between text-sm w-full`}>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181b] border border-neutral-800 text-white rounded-xl shadow-lg">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="technology" textValue="Technology" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Technology</ListBox.Item>
                                            <ListBox.Item id="design" textValue="Design" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Design</ListBox.Item>
                                            <ListBox.Item id="marketing" textValue="Marketing" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Marketing</ListBox.Item>
                                            <ListBox.Item id="management" textValue="Management" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Management</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                {errors.jobCategory && <p className="text-xs text-red-500 mt-1 pl-1">{errors.jobCategory}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Job Type */}
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Job Type</Label>
                                <Select
                                    placeholder="Select Job Type"
                                    selectedKeys={formData.jobType ? [formData.jobType] : []}
                                    onSelectionChange={(keys) => handleSelectChange('jobType', keys)}
                                    className="w-full"
                                >
                                    <Select.Trigger className={`bg-[#18181b] border ${errors.jobType ? 'border-red-500' : 'border-neutral-800'} text-white h-[48px] rounded-xl px-3 flex items-center justify-between text-sm w-full`}>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181b] border border-neutral-800 text-white rounded-xl shadow-lg">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="full-time" textValue="Full-time" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Full-time</ListBox.Item>
                                            <ListBox.Item id="part-time" textValue="Part-time" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Part-time</ListBox.Item>
                                            <ListBox.Item id="contract" textValue="Contract" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Contract</ListBox.Item>
                                            <ListBox.Item id="internship" textValue="Internship" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Internship</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                {errors.jobType && <p className="text-xs text-red-500 mt-1 pl-1">{errors.jobType}</p>}
                            </div>

                            {/* Application Deadline */}
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Application Deadline</Label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full bg-[#18181b] border border-neutral-800 focus:border-neutral-600 rounded-xl px-3 h-[48px] text-white text-sm outline-none transition uppercase"
                                />
                            </div>
                        </div>

                        {/* Salary & Currency */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Min Salary</Label>
                                <input
                                    type="number"
                                    name="minSalary"
                                    placeholder="0.00"
                                    value={formData.minSalary}
                                    onChange={handleChange}
                                    className="w-full bg-[#18181b] border border-neutral-800 focus:border-neutral-600 rounded-xl px-3 h-[48px] text-white text-sm outline-none transition placeholder:text-neutral-600"
                                />
                            </div>

                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Max Salary</Label>
                                <input
                                    type="number"
                                    name="maxSalary"
                                    placeholder="0.00"
                                    value={formData.maxSalary}
                                    onChange={handleChange}
                                    className="w-full bg-[#18181b] border border-neutral-800 focus:border-neutral-600 rounded-xl px-3 h-[48px] text-white text-sm outline-none transition placeholder:text-neutral-600"
                                />
                            </div>

                            {/* Currency Select */}
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Currency</Label>
                                <Select
                                    placeholder="Currency"
                                    selectedKeys={formData.currency ? [formData.currency] : []}
                                    onSelectionChange={(keys) => handleSelectChange('currency', keys)}
                                >
                                    <Select.Trigger className="bg-[#18181b] border border-neutral-800 text-white h-[48px] rounded-xl px-3 flex items-center justify-between text-sm w-full">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181b] border border-neutral-800 text-white rounded-xl shadow-lg">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="USD" textValue="USD ($)" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">USD ($)</ListBox.Item>
                                            <ListBox.Item id="BDT" textValue="BDT (৳)" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">BDT (৳)</ListBox.Item>
                                            <ListBox.Item id="EUR" textValue="EUR (€)" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">EUR (€)</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>

                        {/* Location & Remote Toggle */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs text-neutral-400 pl-1 font-medium">Location</label>
                                <button
                                    type="button"
                                    onClick={toggleRemote}
                                    className={`text-xs px-3 py-1 rounded-full border transition ${formData.isRemote
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600'
                                        }`}
                                >
                                    {formData.isRemote ? '✓ Remote Selected' : 'Set as Remote'}
                                </button>
                            </div>

                            {!formData.isRemote && (
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        placeholder="City, Country (e.g. Dhaka, Bangladesh)"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className={`w-full bg-[#18181b] border ${errors.location ? 'border-red-500' : 'border-neutral-800'} focus:border-neutral-600 rounded-xl px-3 h-[48px] text-white text-sm outline-none transition placeholder:text-neutral-600`}
                                    />
                                    {errors.location && <p className="text-xs text-red-500 mt-1 pl-1">{errors.location}</p>}
                                </div>
                            )}
                        </div>
                    </Fieldset>

                    {/* ================= JOB DESCRIPTION SECTION ================= */}
                    <Fieldset className="space-y-4 pt-4 border-t border-neutral-800/50">
                        <Fieldset.Legend className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                            Job Description Details
                        </Fieldset.Legend>

                        {/* Responsibilities */}
                        <div className="flex flex-col w-full relative">
                            <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Responsibilities</Label>
                            <textarea
                                name="responsibilities"
                                rows={4}
                                placeholder="Outline the core responsibilities and day-to-day tasks..."
                                value={formData.responsibilities}
                                onChange={handleChange}
                                className={`w-full bg-[#18181b] border ${errors.responsibilities ? 'border-red-500' : 'border-neutral-800'} focus:border-neutral-600 rounded-xl p-3 text-white text-sm outline-none transition placeholder:text-neutral-600 resize-none`}
                            />
                            {errors.responsibilities && <p className="text-xs text-red-500 mt-1 pl-1">{errors.responsibilities}</p>}
                        </div>

                        {/* Requirements */}
                        <div className="flex flex-col w-full relative">
                            <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Requirements</Label>
                            <textarea
                                name="requirements"
                                rows={4}
                                placeholder="List required skills, experience, and educational background..."
                                value={formData.requirements}
                                onChange={handleChange}
                                className={`w-full bg-[#18181b] border ${errors.requirements ? 'border-red-500' : 'border-neutral-800'} focus:border-neutral-600 rounded-xl p-3 text-white text-sm outline-none transition placeholder:text-neutral-600 resize-none`}
                            />
                            {errors.requirements && <p className="text-xs text-red-500 mt-1 pl-1">{errors.requirements}</p>}
                        </div>

                        {/* Benefits */}
                        <div className="flex flex-col w-full relative">
                            <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Benefits (Optional)</Label>
                            <textarea
                                name="benefits"
                                rows={3}
                                placeholder="Health insurance, remote allowance, annual bonus, etc..."
                                value={formData.benefits}
                                onChange={handleChange}
                                className="w-full bg-[#18181b] border border-neutral-800 focus:border-neutral-600 rounded-xl p-3 text-white text-sm outline-none transition placeholder:text-neutral-600 resize-none"
                            />
                        </div>
                    </Fieldset>

                    {/* ================= ACTION BUTTONS ================= */}
                    <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row justify-end gap-3">
                        <Button
                            type="button"
                            className="border border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900 font-medium px-6 h-[44px] rounded-xl transition"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-white text-black font-bold px-6 h-[44px] rounded-xl hover:bg-neutral-200 transition"
                        >
                            Post Job
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}