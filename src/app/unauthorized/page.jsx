"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@heroui/react";

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/60 p-8 text-center backdrop-blur-xl shadow-2xl">
                
                {/* Glowing Background Effect */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-red-600/20 blur-2xl" />

                {/* Icon Container */}
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 to-orange-600 shadow-lg shadow-red-600/30">
                    <ShieldAlert size={32} className="text-white" />
                </div>

                {/* Error Code & Title */}
                <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                    Access Denied
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">
                    Unauthorized
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                 oops! You don`t have permission too Access this page.please in sign in with an authorized account or head back the dashboard .
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    
                    {/* Back Button */}
                    <Button 
                        as="button" 
                        variant="bordered" 
                        className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 rounded-xl"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </Button>

                    {/* Home Button */}
                    <Button 
                        as={Link} 
                        href="/" 
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 shadow-md shadow-blue-600/20"
                    >
                        <Home size={16} />
                        Back to Home
                    </Button>

                </div>

            </div>
        </div>
    );
}