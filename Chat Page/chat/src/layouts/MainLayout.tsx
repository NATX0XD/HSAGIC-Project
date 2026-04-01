"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-slate-50 selection:bg-violet-100 selection:text-violet-900 pl-0">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* Main Content Floating Card */}
            <main className="flex-1 flex flex-col min-w-0 bg-white shadow-[0_4px_30px_rgb(0,0,0,0.03)] rounded-[20px] ring-1 ring-slate-200/50 my-3 mr-3 overflow-hidden">
                <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex-1 overflow-y-auto">{children}</div>
            </main>
        </div>
    );
}
