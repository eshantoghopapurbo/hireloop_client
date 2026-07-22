"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BriefcaseBusiness } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = useSession();
    console.log("session data in Navbar:", session, "Is Pending:", isPending);
    const user = session?.user;
    const handleSignOut = async () => {
        await signOut();
    }

    const navLinks = [
        {
            name: "Browse Jobs",
            href: "/jobs",
        },
        {
            name: "Companies",
            href: "/companies",
        },
        {
            name: "Pricing",
            href: "/plans",
        },
    ];
    
    const dashboardLinks ={
        seeker:"/dashboard/seeker",
        recruiter:"/dashboard/recruiter",
        admin:"/dashboard/admin"
    }
    
    if(user?.email){
        navLinks.push(
            {
                name:"Dashboard",
                href: dashboardLinks [user?.role || "seeker"]
            }
        )
    }

    return (
        <nav className="sticky top-0 z-50 px-4 ">
            <div>
                <header className="flex h-20 items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-6 backdrop-blur-xl">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600">
                            <BriefcaseBusiness size={22} className="text-white" />
                        </div>

                        <h1 className="text-2xl font-bold">
                            <span className="text-blue-500">hire</span>
                            <span className="text-orange-500">loop</span>
                        </h1>
                    </Link>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-8 ml-auto">

                        {/* Navigation */}
                        <ul className="flex items-center gap-10">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-gray-300 transition hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="h-6 w-px bg-white/20" />

                        {/* Actions */}
                        <div className="flex items-center gap-5">
                            {
                                user ?
                                    <>
                                        <h1 className="text-blue-500">Hi,{user.name}</h1>
                                        <Button onClick={handleSignOut} variant="ghost">sign Out</Button>
                                    </>
                                    :
                                    <Link
                                        href="/auth/signin"
                                        className="font-medium text-blue-500 hover:text-blue-400"
                                    >
                                        Sign In
                                    </Link>}

                            <Link
                                href="/auth/signup"
                                className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white transition hover:opacity-90"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>
                </header>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mt-3 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
                        <ul className="flex flex-col p-6">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block py-3 text-gray-300 hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}

                            <div className="mt-4 flex flex-col gap-3">
                                <Link
                                    href="/auth/signin"
                                    className="text-center text-violet-400"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/auth/signup"
                                    className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-center font-medium text-white"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}