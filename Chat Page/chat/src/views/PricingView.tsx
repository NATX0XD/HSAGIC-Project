"use client";

import React from "react";
import { HiOutlineCheck } from "react-icons/hi2";

export default function PricingView() {
    return (
        <div className="w-full max-w-[1200px] mx-auto py-4 px-4 relative z-10">

            {/* Header */}
            <div className="text-center mb-6 space-y-2">
                <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 shadow-sm backdrop-blur-sm">
                    Upgrade your HSAGIC workspace
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1e293b] tracking-tight">
                    Transparent pricing, <span className="font-serif italic font-normal text-slate-500">with top tier AI partner</span>
                </h1>
                <p className="text-[#64748b] text-[15px] sm:text-base max-w-2xl mx-auto">
                    Transparent pricing tailored to your logistics needs, ensuring affordability without compromising on accuracy.
                </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid md:grid-cols-3 gap-4 items-start relative mt-4">

                {/* Card 1: Free */}
                <div className="bg-white rounded-[32px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 mt-4 relative hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                            <span>01 Basic Plan</span>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                                HSAGIC <span className="italic font-serif font-medium text-slate-500">Free</span>
                            </h3>
                            <p className="text-sm text-slate-500">Essential tools for individuals</p>
                        </div>

                        <button className="w-full py-2 px-4 rounded-full border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-slate-300 transition-colors">
                            Current Plan
                        </button>

                        <div className="flex items-baseline gap-1 mt-4">
                            <span className="text-[15px] font-semibold text-slate-700">$</span>
                            <span className="text-3xl font-extrabold text-slate-900 leading-none">0</span>
                            <span className="text-sm font-medium text-slate-500">/mo</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">Free forever</p>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            {[
                                "Basic HS Code Lookup",
                                "10 Text prompts per day",
                                "Standard document analysis",
                                "Community support"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <HiOutlineCheck className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-[13px] font-medium text-slate-600 leading-tight">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 2: Pro (Highlighted) */}
                <div className="relative">
                    {/* Gradient Border Output */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f9c58d] via-[#e4a5ff] to-[#7cbcf9] rounded-[36px] -z-10 blur-[2px] opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f9c58d] via-[#e4a5ff] to-[#7cbcf9] rounded-[36px] -z-10" />

                    {/* Inner Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-[34px] p-5 m-[3px] shadow-xl relative z-10 h-full">

                        {/* Badge */}
                        <div className="absolute -top-3 inset-x-0 flex justify-center">
                            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                                Best Value to Price
                            </span>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                                <span>02 Pro</span>
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">
                                    HSAGIC <span className="italic font-serif font-medium text-slate-500">Pro</span>
                                </h3>
                                <p className="text-sm text-slate-500">Advanced AI features for professionals</p>
                            </div>

                            <button className="w-full py-2 px-4 rounded-full bg-[#6c8cfb] text-white font-bold text-sm hover:bg-[#5a7bed] transition-colors shadow-md shadow-blue-200">
                                Get HSAGIC Pro
                            </button>

                            <div className="flex items-baseline gap-1 mt-4">
                                <span className="text-[15px] font-semibold text-slate-700">$</span>
                                <span className="text-3xl font-extrabold text-slate-900 leading-none">29</span>
                                <span className="text-sm font-medium text-slate-500">/mo</span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">Billed annually or $35 month-to-month</p>

                            <div className="pt-4 border-t border-slate-100 space-y-3">
                                {[
                                    "Everything in Free plan",
                                    "Unlimited Text prompts",
                                    "Advanced image & invoice analysis",
                                    "Save custom prompt templates",
                                    "Priority AI processing speed",
                                    "Export history to PDF/Excel"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <HiOutlineCheck className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-[13px] font-medium text-slate-700 leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Custom */}
                <div className="bg-white rounded-[32px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 mt-4 relative hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                            <span>03 Enterprise</span>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                                Custom <span className="italic font-serif font-medium text-slate-500">Plan</span>
                            </h3>
                            <p className="text-sm text-slate-500">Fitting your organizational needs</p>
                        </div>

                        <button className="w-full py-2 px-4 rounded-full border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-slate-300 transition-colors">
                            Book a call
                        </button>

                        <div className="flex flex-col mt-4">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Starting from</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[15px] font-semibold text-slate-700">$</span>
                                <span className="text-3xl font-extrabold text-slate-900 leading-none">199</span>
                                <span className="text-sm font-medium text-slate-500">/mo</span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">Custom billing available</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            {[
                                "Dedicated account manager",
                                "Custom API integrations",
                                "SSO & advanced security",
                                "Team collaboration & shared history",
                                "Custom AI model fine-tuning"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <HiOutlineCheck className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-[13px] font-medium text-slate-600 leading-tight">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer simple tag */}
            <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-xs font-medium text-slate-500">
                    <span className="text-green-500 text-lg">🍃</span>
                    HSAGIC Pro contributes 1% of your subscription to remove CO₂ from the atmosphere.
                </div>
            </div>

        </div>
    );
}
