"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="relative overflow-hidden bg-black py-32">
            {/* Purple Glow */}
            <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/40 blur-[180px]" />

            {/* Grid Dome */}
            <div className="absolute inset-0 flex justify-center overflow-hidden">
                <div
                    className="absolute top-0 h-[900px] w-[1400px] rounded-full border border-violet-500/10 opacity-50"
                    style={{
                        backgroundImage: `
                       linear-gradient(rgba(139,92,246,.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139,92,246,.15) 1px, transparent 1px)
                    `,
                        backgroundSize: "48px 48px",
                        transform: "perspective(900px) rotateX(70deg)",
                        transformOrigin: "top center",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
                <h2 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
                    Your next role is
                    <br />
                    already looking for you
                </h2>

                <p className="mt-6 text-lg text-zinc-400">
                    Build a profile in three minutes. The matches start
                    arriving tomorrow morning.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        radius="md"
                        className="h-14 px-8 bg-white text-black font-medium"
                    >
                        Create a free account
                    </Button>

                    <Button
                        size="lg"
                        radius="md"
                        variant="bordered"
                        className="h-14 px-8 border-zinc-700 text-white"
                    >
                        View pricing
                    </Button>
                </div>
            </div>
        </section>
    );
}