"use client";

import { Magnifier, Gear, LocationArrow } from "@gravity-ui/icons";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center bg-black px-4 py-20 text-center overflow-hidden">

            {/* Background Subtle Stars Effect / Glow (Optional) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.06),transparent_70%)]" />
            {/* 1. Top Badge */}
            <div className="relative z-10 mb-6 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="text-base">💼</span>
                <p className="text-xs font-medium tracking-widest text-gray-400 uppercase">
                    <span className="text-white font-bold">50,000+</span> New Jobs This Month
                </p>
            </div>

            {/* 2. Heading Titles */}
            <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto mb-4">
                Find Your Dream Job Today
            </h1>

            <p className="relative z-10 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                HireLoop connects top talent with world-class companies. Browse thousands of
                curated opportunities and land your next role — faster.
            </p>

            {/* 3. Combined Search Bar */}
            <div className="relative z-10 w-full max-w-3xl rounded-full border border-white/[0.1] bg-[#0d0d0d]/80 p-2 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl">

                {/* Job Title Search Input */}
                <div className="w-full flex items-center gap-3 px-4 py-2">
                    <Magnifier className="w-5 h-5 text-gray-500 shrink-0" />
                    <input
                        type="text"
                        placeholder="Job title, skill or company"
                        className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                    />
                </div>

                {/* Desktop Divider line */}
                <div className="hidden sm:block h-6 w-[1px] bg-white/[0.15]" />

                {/* Location Input */}
                <div className="w-full flex items-center gap-3 px-4 py-2">
                    <LocationArrow className="w-5 h-5 text-gray-500 shrink-0" />
                    <input
                        type="text"
                        placeholder="Location or Remote"
                        className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                    />
                </div>

                {/* Purple Search Button */}
                <button className="w-full sm:w-auto p-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-colors duration-200 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    <Magnifier className="w-5 h-5 text-white stroke-[2.5]" />
                </button>
            </div>

            {/* 4. Trending Positions / Tags */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-gray-400">
                <span className="text-xs sm:text-sm font-medium text-gray-500">Trending Position</span>

                <button className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-gray-300 hover:border-indigo-500/50 hover:bg-white/[0.08] transition-all">
                    Product Designer
                </button>
                <button className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-gray-300 hover:border-indigo-500/50 hover:bg-white/[0.08] transition-all">
                    AI Engineering
                </button>
                <button className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-gray-300 hover:border-indigo-500/50 hover:bg-white/[0.08] transition-all">
                    Dev-ops Engineer
                </button>
            </div>
        </section>
    );
}