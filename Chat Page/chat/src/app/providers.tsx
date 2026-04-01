"use client";

import { HeroUIProvider } from "@heroui/react";
import { TopbarProvider } from "@/contexts/TopbarContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <TopbarProvider>
                {children}
            </TopbarProvider>
        </HeroUIProvider>
    );
}
