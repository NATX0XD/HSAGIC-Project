"use client";

import React from "react";
import { Card } from "@heroui/react";
import { TbPackageExport } from "react-icons/tb";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen items-center justify-center gradient-warm px-4 py-8">
            {/* Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]" />
                <div className="absolute top-1/3 left-1/2 h-64 w-64 rounded-full bg-[var(--accent)] opacity-[0.02] blur-[80px]" />
            </div>

            <div className="w-full max-w-[440px] relative">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-10 animate-fade-in">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-accent shadow-lg">
                        <TbPackageExport size={26} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                        HS<span className="text-[var(--accent)]">AGIC</span>
                    </span>
                </div>

                {/* Card */}
                <Card
                    shadow="none"
                    classNames={{
                        base: "rounded-[24px] glass p-8 animate-slide-in-up border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.06)]",
                    }}
                >
                    {children}
                </Card>

                {/* Footer */}
                <p className="mt-8 text-center text-xs text-[var(--text-muted)] animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    © 2026 HSAGIC. Smart HS Code & Logistics Intelligence.
                </p>
            </div>
        </div>
    );
}
