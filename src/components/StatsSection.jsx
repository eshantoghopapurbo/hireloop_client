"use client";
import Image from "next/image";
import { motion } from "motion/react"
import {
    Briefcase,
    Factory,
    Person,
    Star,
} from "@gravity-ui/icons";

const stats = [
    {
        icon: Briefcase,
        value: "50K",
        label: "Active Jobs",
    },
    {
        icon: Factory,
        value: "12K",
        label: "Companies",
    },
    {
        icon: Person,
        value: "2M",
        label: "Job Seekers",
    },
    {
        icon: Star,
        value: "97%",
        label: "Satisfaction Rate",
    },
];

export default function StatsSection() {
    return (
        <section className="relative overflow-hidden bg-black py-24">
            {/* Globe Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
                style={{
                    backgroundImage: "url('/images/globe.png')"
                }}
            >
            </div>

            {/* Purple Glow */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-violet-600/30 blur-[140px]" />
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4">
                <div className="text-center mb-14">
                    <h2 className="text-2xl  text-white max-w-3xl mx-auto leading-tight">
                        Assisting over{" "}
                        <span className="text-violet-400">15,000</span> job seekers
                        <br />
                        find their dream positions.
                    </h2>
                    <motion.p animate={{ rotate: 360 }} className="text-xl">Remote jobs</motion.p>
                    <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl" > jobs no-2</motion.p>
                </div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 h-52 transition-all duration-300 hover:border-violet-500/40"
                            >
                                <div className="mb-10">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                <h3 className="text-5xl font-bold text-white mb-3">
                                    {item.value}
                                </h3>
                                <p className="text-gray-300 text-lg">
                                    {item.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}