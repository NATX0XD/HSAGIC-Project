"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { motion } from "framer-motion";

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative h-[100dvh] w-full bg-[#f8fafc] overflow-hidden flex flex-col">

            {/* --- Blurred Glow Orbs Background --- */}
            {/* The reference has a bright, airy background with soft, colorful orbs behind the cards */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Top left orange/peach glow */}
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#ffecd2]/80 rounded-full blur-[120px]" />
                {/* Center left soft purple glow */}
                <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-[#f3e7ff]/70 rounded-full blur-[120px]" />
                {/* Center right soft blue glow */}
                <div className="absolute top-[10%] -right-[5%] w-[45%] h-[45%] bg-[#e0f2fe]/80 rounded-full blur-[100px]" />
                {/* Bottom right blue/purple glow */}
                <div className="absolute bottom-[0%] right-[10%] w-[50%] h-[50%] bg-[#ede9fe]/60 rounded-full blur-[130px]" />
                {/* Center bottom peach glow */}
                <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-[#fff0e6]/70 rounded-full blur-[120px]" />
            </div>

            {/* Navigation Bar (Floating/Fixed) */}
            <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 py-6 flex items-center justify-between pointer-events-none">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="pointer-events-auto"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.05)] text-slate-700 font-semibold text-sm transition-all hover:-translate-y-0.5"
                    >
                        <HiOutlineArrowLeft className="w-4 h-4" />
                        Back to AI Assistant
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-slate-500 font-bold tracking-tight"
                >
                    <span className="text-blue-500">⚛</span> <a href="https://design2deploy-site.vercel.app/en" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 transition-colors">DESIGN TO DEPLOY</a> Pricing
                </motion.div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10 flex flex-col items-center pt-4 pb-20">
                {children}
            </main>

        </div>
    );
}
