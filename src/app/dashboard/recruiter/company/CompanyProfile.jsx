"use client";

import React, { useState } from "react";
import { Form, Fieldset, Label, Select, ListBox, Button } from "@heroui/react";
import { Upload, MapPin, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { createCompany } from "@/lib/action/companies";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
    const [company,setCompany] =useState(recruiterCompany);
    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        websiteUrl: "",
        location: "",
        employeeCount: "",
        logo: "",
        description: "",
        recruiterId: recruiter?.id || "",
    });

    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSelectChange = (field, keys) => {
        const selectedValue = Array.from(keys)[0];
        setFormData((prev) => ({ ...prev, [field]: selectedValue }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    // ImgBB API Integration for Logo Upload
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append("image", file);

        try {
            // Replace with your actual ImgBB Client API key
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: data
            });
            const resData = await response.json();

            if (resData.success) {
                setFormData((prev) => ({ ...prev, logo: resData.data.url }));
            } else {
                alert("Upload failed. Try again.");
            }
        } catch (error) {
            console.error("ImgBB Upload Error:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic Validation matching your design
        let tempErrors = {};
        if (!formData.companyName) tempErrors.companyName = "Company name is required";
        if (!formData.industry) tempErrors.industry = "Please select an industry";
        if (!formData.location) tempErrors.location = "Location is required";

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        }
        setSubmitting(true);
        console.log("Submitting fully mapped enterprise structural payload to DB:", formData);

        try {
            const payload = await createCompany(formData);

            if (payload.insertedId) {
                console.log("Company created successfully:", payload);
                toast.success("Company registered successfully!");
            } else {
                toast.error("Failed to create company.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Something went wrong!");
        } finally {
            setSubmitting(false);
        }
        // Mocking Database Save latency
    };

    return (
        <div className="w-full min-h-screen bg-[#09090b] text-white p-6 flex justify-center items-center">
            <div className="w-full max-w-3xl bg-[#09090b] border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">

                <Form onSubmit={handleSubmit} className="p-6 space-y-8">

                    <Fieldset className="space-y-6">
                        <Fieldset.Legend className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                            Register Company Profile
                        </Fieldset.Legend>
                        {/* ROW 1: Company Name & Industry */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Company Name</Label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="e.g. Acme Corp"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className={`w-full bg-[#18181b] border ${errors.companyName ? 'border-red-500' : 'border-neutral-800'} focus:border-neutral-600 rounded-xl px-3 h-[48px] text-white text-sm outline-none transition placeholder:text-neutral-600`}
                                />
                                {errors.companyName && <p className="text-xs text-red-500 mt-1 pl-1">{errors.companyName}</p>}
                            </div>

                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Industry / Category</Label>
                                <Select
                                    placeholder="Technology"
                                    selectedKeys={formData.industry ? [formData.industry] : []}
                                    onSelectionChange={(keys) => handleSelectChange("industry", keys)}
                                >
                                    <Select.Trigger className={`bg-[#18181b] border ${errors.industry ? 'border-red-500' : 'border-neutral-800'} text-white h-[48px] rounded-xl px-3 flex items-center justify-between text-sm w-full`}>
                                        <Select.Value />
                                        <Select.Indicator><ChevronDown className="w-4 h-4 text-neutral-500" /></Select.Indicator>
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181b] border border-neutral-800 text-white rounded-xl shadow-lg">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="Technology" textValue="Technology" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Technology</ListBox.Item>
                                            <ListBox.Item id="Fintech" textValue="Fintech" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Fintech</ListBox.Item>
                                            <ListBox.Item id="AI" textValue="AI" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">AI / Machine Learning</ListBox.Item>
                                            <ListBox.Item id="Developer Tools" textValue="Developer Tools" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">Developer Tools</ListBox.Item>
                                            <ListBox.Item id="E-Commerce" textValue="E-Commerce" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">E-Commerce</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>

                        {/* ROW 2: Website URL & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Website URL</Label>
                                <div className="flex items-center w-full bg-[#18181b] border border-neutral-800 focus-within:border-neutral-600 rounded-xl overflow-hidden transition h-[48px]">
                                    <span className="bg-neutral-900/50 text-neutral-500 text-sm px-3.5 h-full flex items-center border-r border-neutral-800/80">https://</span>
                                    <input
                                        type="text"
                                        name="websiteUrl"
                                        placeholder="www.company.com"
                                        value={formData.websiteUrl}
                                        onChange={handleChange}
                                        className="w-full bg-transparent px-3 text-white text-sm outline-none placeholder:text-neutral-600"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Location</Label>
                                <div className="flex items-center w-full bg-[#18181b] border ${errors.location ? 'border-red-500' : 'border-neutral-800'} focus-within:border-neutral-600 rounded-xl px-3 h-[48px] transition">
                                    <MapPin className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="City, Country"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full bg-transparent text-white text-sm outline-none placeholder:text-neutral-600"
                                    />
                                </div>
                                {errors.location && <p className="text-xs text-red-500 mt-1 pl-1">{errors.location}</p>}
                            </div>
                        </div>

                        {/* ROW 3: Employee Range & Logo Upload Component */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col w-full relative">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Employee Count Range</Label>
                                <Select
                                    placeholder="1-10 employees"
                                    selectedKeys={formData.employeeCount ? [formData.employeeCount] : []}
                                    onSelectionChange={(keys) => handleSelectChange("employeeCount", keys)}
                                >
                                    <Select.Trigger className="bg-[#18181b] border border-neutral-800 text-white h-[48px] rounded-xl px-3 flex items-center justify-between text-sm w-full">
                                        <Select.Value />
                                        <Select.Indicator><ChevronDown className="w-4 h-4 text-neutral-500" /></Select.Indicator>
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181b] border border-neutral-800 text-white rounded-xl shadow-lg">
                                        <ListBox className="p-1">
                                            <ListBox.Item id="1-10" textValue="1-10 employees" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">1-10 employees</ListBox.Item>
                                            <ListBox.Item id="11-50" textValue="11-50 employees" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">11-50 employees</ListBox.Item>
                                            <ListBox.Item id="51-200" textValue="51-200 employees" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">51-200 employees</ListBox.Item>
                                            <ListBox.Item id="201-500" textValue="201-500 employees" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">201-500 employees</ListBox.Item>
                                            <ListBox.Item id="500+" textValue="500+ employees" className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm">500+ employees</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Dashboard Upload Box Context */}
                            <div className="flex flex-col w-full">
                                <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Company Logo</Label>
                                <div className="flex items-center gap-3 w-full bg-[#18181b] border border-neutral-800 rounded-xl p-2 h-[48px] relative overflow-hidden">
                                    <div className="h-8 w-8 bg-neutral-900 border border-dashed border-neutral-700 rounded-lg flex items-center justify-center shrink-0">
                                        {uploading ? (
                                            <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                                        ) : formData.logo ? (
                                            <Image
                                                src={formData.logo} alt="Logo"
                                                width={32}
                                                height={32}
                                                className=" object-cover rounded-lg" />
                                        ) : (
                                            <Upload className="w-4 h-4 text-neutral-400" />
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs text-neutral-200 font-medium truncate">
                                            {formData.logo ? "Logo Image Uploaded" : "Upload image"}
                                        </span>
                                        <span className="text-[10px] text-neutral-500 truncate">PNG, JPG up to 5MB</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={uploading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Brief Description Area */}
                        <div className="flex flex-col w-full relative">
                            <Label className="text-xs text-neutral-400 mb-1.5 pl-1 font-medium">Brief Description</Label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="Tell us about your company's mission and culture..."
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-[#18181b] border border-neutral-800 focus:border-neutral-600 rounded-xl p-3 text-white text-sm outline-none transition placeholder:text-neutral-600 resize-none"
                            />
                        </div>
                    </Fieldset>

                    {/* ACTION PANEL */}
                    <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            className="border border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900 font-medium px-6 h-[44px] rounded-xl transition"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={submitting}
                            disabled={uploading}
                            className="bg-white text-black font-bold px-6 h-[44px] rounded-xl hover:bg-neutral-200 transition"
                        >
                            Register Company
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}
